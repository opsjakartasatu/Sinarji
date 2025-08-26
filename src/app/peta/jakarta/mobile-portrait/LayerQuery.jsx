import { Close, FilterList } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const LayerQuery = ({ view, layer, queryOpen, setQueryOpen }) => {
  const [loading, setLoading] = useState(false);
  const [expressions, setExpressions] = useState([
    {
      connection: "",
      field: "",
      operator: "",
      possibleValues: [],
      value: "",
      isLoading: false,
    },
  ]);
  const [layerFields, setLayerFields] = useState([]);
  const [activeQueryText, setActiveQueryText] = useState("");
  const [hasActiveQuery, setHasActiveQuery] = useState(false);

  useEffect(() => {
    const fetchLayerFields = async () => {
      if (!layer || !queryOpen) return;
      
      setLoading(true);
      
      try {
        if (layer.type === "feature") {
          setLayerFields(layer.fields || []);
          if (layer.definitionExpression) {
            parseExistingExpression(layer.definitionExpression);
            setActiveQueryText(layer.definitionExpression);
            setHasActiveQuery(true);
          }
        } 
        else if (layer.type === "map-image") {
          if (layer.sublayers && layer.sublayers.items.length > 0) {
            const sublayer = layer.sublayers.items[0]; 
            if (sublayer.fields) {
              setLayerFields(sublayer.fields);
            } else {
              const sublayerUrl = `${layer.url}/${sublayer.id}?f=json`;
              const response = await fetch(sublayerUrl);
              const data = await response.json();
              setLayerFields(data.fields || []);
            }
            if (sublayer.definitionExpression) {
              parseExistingExpression(sublayer.definitionExpression);
              setActiveQueryText(sublayer.definitionExpression);
              setHasActiveQuery(true);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching layer fields:", error);
        Swal.fire({
          icon: "error",
          title: "Error fetching layer fields",
          text: "Unable to load field information for this layer.",
          timer: 3000,
          timerProgressBar: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLayerFields();
  }, [layer, queryOpen]);

  useEffect(() => {
    const checkExistingFilter = () => {
      if (!layer) return;
      
      try {
        if (layer.type === "feature" && layer.definitionExpression) {
          setActiveQueryText(layer.definitionExpression);
          setHasActiveQuery(true);
        } 
        else if (layer.type === "map-image" && layer.sublayers && layer.sublayers.items.length > 0) {
          const sublayer = layer.sublayers.items[0];
          if (sublayer.definitionExpression) {
            setActiveQueryText(sublayer.definitionExpression);
            setHasActiveQuery(true);
          }
        }
      } catch (error) {
        console.error("Error checking existing filter:", error);
      }
    };
    
    checkExistingFilter();
  }, [layer]);

  const parseExistingExpression = (expressionString) => {
    if (!expressionString) return;
  
    try {
      const tokens = expressionString.split(/\s+(AND|OR)\s+/i);
      const newExpressions = [];
  
      for (let i = 0; i < tokens.length; i += 2) {
        const clause = tokens[i].trim();
        const connector = i === 0 ? "" : tokens[i - 1].toUpperCase();
        const match = clause.match(/([^\s=<>]+)\s*(=|<>)\s*[']?(.*?)[']?$/);
        
        if (!match) {
          console.warn(`Could not parse expression clause: ${clause}`);
          continue;
        }
        
        const [, field, operator, rawValue] = match;
        const value = rawValue.replace(/^'|'$/g, '');
        
        newExpressions.push({
          connection: connector,
          field,
          operator,
          possibleValues: [],
          value,
          isLoading: true
        });
      }
  
      if (newExpressions.length > 0) {
        setExpressions(newExpressions);
        Promise.all(
          newExpressions.map((expr, index) => {
            if (expr.field) {
              return fetchFieldValues(expr.field, index);
            }
            return Promise.resolve();
          })
        ).catch(err => {
          console.error("Error fetching field values:", err);
        });
      }
    } catch (error) {
      console.error("Error parsing expression:", error);
      setExpressions([
        {
          connection: "",
          field: "",
          operator: "",
          possibleValues: [],
          value: "",
          isLoading: false,
        }
      ]);
    }
  };
  
  const fetchFieldValues = async (fieldName, expressionIndex) => {
    if (!fieldName || !layer) return Promise.reject("Invalid field or layer");
    
    try {
      let url;
      let layerId;
      
      if (layer.type === "feature") {
        url = layer.url;
        layerId = layer.layerId || "";
      } else if (layer.type === "map-image" && layer.sublayers && layer.sublayers.items.length > 0) {
        url = layer.url;
        layerId = layer.sublayers.items[0].id;
      } else {
        return Promise.reject("Unsupported layer type");
      }
      
      const apiUrl = `${url}/${layerId}/query?where=1%3D1&outFields=${fieldName}&returnGeometry=false&returnDistinctValues=true&f=json`;
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch values for field ${fieldName}`);
      }
      
      const data = await response.json();
      
      if (data.features && Array.isArray(data.features)) {
        const distinctValues = data.features
          .map(feature => feature.attributes[fieldName])
          .filter((value, index, self) => self.indexOf(value) === index)
          .sort();
        
        setExpressions(prevExpressions => {
          const updated = [...prevExpressions];
          if (updated[expressionIndex]) {
            updated[expressionIndex] = {
              ...updated[expressionIndex],
              possibleValues: distinctValues,
              isLoading: false
            };
          }
          return updated;
        });
        
        return Promise.resolve();
      }
    } catch (error) {
      console.error(`Error fetching values for field ${fieldName}:`, error);
      
      setExpressions(prevExpressions => {
        const updated = [...prevExpressions];
        if (updated[expressionIndex]) {
          updated[expressionIndex] = {
            ...updated[expressionIndex],
            isLoading: false
          };
        }
        return updated;
      });
      
      return Promise.reject(error);
    }
  };

  const handleConnectionChange = (index, event) => {
    setExpressions(prevstate => {
      const updatedExpression = [...prevstate];
      updatedExpression[index].connection = event.target.value;
      return updatedExpression;
    });
  };

  const handleFieldChange = async (index, event) => {
    const selectedField = event.target.value;

    setExpressions(prevState => {
      const updatedExpressions = [...prevState];
      updatedExpressions[index].field = selectedField;
      updatedExpressions[index].isLoading = true;
      updatedExpressions[index].possibleValues = [];
      updatedExpressions[index].value = "";
      return updatedExpressions;
    });

    await fetchFieldValues(selectedField, index);
  };

  const handleOperatorChange = (index, event) => {
    setExpressions(prevState => {
      const updatedExpression = [...prevState];
      updatedExpression[index].operator = event.target.value;
      return updatedExpression;
    });
  };

  const handleValueChange = (index, event) => {
    setExpressions(prevState => {
      const updatedExpression = [...prevState];
      updatedExpression[index].value = event.target.value;
      return updatedExpression;
    });
  };

  const addExpression = () => {
    setExpressions(prevstate => {
      const newExpression = {
        connection: "AND",
        field: "",
        operator: "",
        possibleValues: [],
        value: "",
        isLoading: false
      };
      return [...prevstate, newExpression];
    });
  };

  const deleteExpression = (index) => {
    if (expressions.length <= 1) {
      resetQuery();
      return;
    }
    
    setExpressions(prevstate => {
      const updatedExpression = [...prevstate];
      updatedExpression.splice(index, 1);
      return updatedExpression;
    });
  };

  const resetQuery = () => {
    setExpressions([
      {
        connection: "",
        field: "",
        operator: "",
        possibleValues: [],
        value: "",
        isLoading: false,
      },
    ]);
    
    clearLayerFilter();
    setActiveQueryText("");
    setHasActiveQuery(false);
  };

  const clearLayerFilter = () => {
    if (!view || !layer) return;
    
    try {
      if (layer.type === "feature") {
        layer.definitionExpression = null;
       
        view.whenLayerView(layer).then(layerView => {
          if (layerView && layerView.filter) {
            layerView.filter = null;
          }
        });
      } 
      else if (layer.type === "map-image" && layer.sublayers && layer.sublayers.items.length > 0) {
        const sublayer = layer.sublayers.items[0];
        sublayer.definitionExpression = null;
      }
    } catch (error) {
      console.error("Error clearing layer filter:", error);
    }
  };

  const validateQuery = () => {
    const fieldAndValuesByConnection = {};
    if (expressions.length <= 1) return { valid: true };
    for (let i = 1; i < expressions.length; i++) {
      const expr = expressions[i];
      const prevExpr = expressions[i-1];
      
      if (expr.connection === "AND") {
        if (expr.field === prevExpr.field && expr.operator === "=" && prevExpr.operator === "=") {
          if (expr.value !== prevExpr.value) {
            return { 
              valid: false, 
              message: `Query tidak valid: Field "${expr.field}" tidak bisa sama dengan "${prevExpr.value}" DAN "${expr.value}" pada saat yang sama.` 
            };
          }
        }
      
        if (!fieldAndValuesByConnection[expr.field]) {
          fieldAndValuesByConnection[expr.field] = [];
        }
        fieldAndValuesByConnection[expr.field].push({
          operator: expr.operator,
          value: expr.value
        });
        
        // Check setiap field yang memiliki multiple values dengan AND
        for (const field in fieldAndValuesByConnection) {
          const values = fieldAndValuesByConnection[field];
          if (values.length > 1) {
            const equalValues = values
              .filter(v => v.operator === "=")
              .map(v => v.value);
              
            if (equalValues.length > 1 && new Set(equalValues).size > 1) {
              return { 
                valid: false, 
                message: `Query tidak valid: Field "${field}" tidak bisa memiliki beberapa nilai berbeda (${equalValues.join(", ")}) dengan operator AND.` 
              };
            }
            
            // Cari konflik antara = dan <>
            const equalValue = values.find(v => v.operator === "=")?.value;
            const notEqualValues = values
              .filter(v => v.operator === "<>")
              .map(v => v.value);
              
            if (equalValue && notEqualValues.includes(equalValue)) {
              return { 
                valid: false, 
                message: `Query tidak valid: Field "${field}" tidak bisa sama dengan "${equalValue}" DAN tidak sama dengan "${equalValue}" pada saat yang sama.` 
              };
            }
          }
        }
      }
    }
    
    return { valid: true };
  };

  const applyQuery = async () => {
    if (!view || !layer || !expressions) return;
  
    const isDefaultExpression =
      expressions.length === 1 &&
      (!expressions[0].field || !expressions[0].operator || !expressions[0].value);
  
    if (isDefaultExpression) {
      clearLayerFilter();
      setActiveQueryText("");
      setHasActiveQuery(false);
      return;
    }
    
    const queryValidation = validateQuery();
    if (!queryValidation.valid) {
      Swal.fire({
        icon: "error",
        title: "Query Tidak Valid",
        text: queryValidation.message,
        timer: 5000,
        timerProgressBar: true,
      });
      return;
    }
  
    let whereClause = "";
    expressions.forEach((expression, index) => {
      if (expression.field && expression.operator && expression.value) {
        if (index === 0) {
          whereClause = `${expression.field} ${expression.operator} '${expression.value}'`;
        } else {
          whereClause += ` ${expression.connection} ${expression.field} ${expression.operator} '${expression.value}'`;
        }
      }
    });
  
    if (!whereClause) {
      whereClause = "1=1";
    }
  
    try {
      setLoading(true);
      let queryResult;
      
      if (layer.type === "feature") {
        layer.definitionExpression = whereClause;
        try {
          const layerView = await view.whenLayerView(layer);
          if (layerView) {
            layerView.filter = {
              where: whereClause
            };
          }
        } catch (lvError) {
          console.warn("Unable to set layerView filter:", lvError);
        }
     
        queryResult = await layer.queryExtent({
          where: whereClause,
          outSpatialReference: view.spatialReference
        });
      } 
      else if (layer.type === "map-image" && layer.sublayers && layer.sublayers.items.length > 0) {
        const sublayer = layer.sublayers.items[0];
        sublayer.definitionExpression = whereClause;
  
        const url = `${layer.url}/${sublayer.id}/query`;
        const params = new URLSearchParams({
          where: whereClause,
          returnExtentOnly: true,
          outSR: view.spatialReference.wkid,
          f: "json"
        });
        
        const response = await fetch(`${url}?${params}`);
        const data = await response.json();
        
        if (data && data.extent) {
          queryResult = {
            extent: {
              xmin: data.extent.xmin,
              ymin: data.extent.ymin,
              xmax: data.extent.xmax,
              ymax: data.extent.ymax,
              spatialReference: data.extent.spatialReference
            }
          };
        }
      }
  
      setActiveQueryText(whereClause);
      setHasActiveQuery(true);
  
      if (queryResult && queryResult.extent) {
        if (
          queryResult.extent.xmin !== queryResult.extent.xmax && 
          queryResult.extent.ymin !== queryResult.extent.ymax
        ) {
          const padding = {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50
          };
          await view.goTo(queryResult.extent, { 
            duration: 1000,
            padding: padding
          });
        } else {

          await view.goTo({
            target: queryResult.extent,
            zoom: 15
          }, { duration: 1000 });
        }
        
        Swal.fire({
          icon: "success",
          title: "Query Berhasil",
          text: "Filter berhasil diterapkan.",
          timer: 5000,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Query Tidak Dapat Dilakukan",
          text: "Tidak ada data yang memenuhi kriteria untuk dilakukan query.",
          timer: 5000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error applying query:", error);
      Swal.fire({
        icon: "error",
        title: "Error menerapkan query",
        text: `Gagal untuk menerapkan filter hasil query: ${error.message}`,
        timer: 5000,
        timerProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseQuery = () => setQueryOpen(false);
  
  const getReadableQueryText = () => {
    if (!activeQueryText) return "";
    let readableText = activeQueryText;
    layerFields.forEach(field => {
      if (readableText.includes(field.name)) {
        const fieldAlias = field.alias || field.name;
        const fieldRegex = new RegExp(`\\b${field.name}\\b`, 'g');
        readableText = readableText.replace(fieldRegex, fieldAlias);
      }
    });
    
    readableText = readableText.replace(/=/g, " IS ");
    readableText = readableText.replace(/<>/g, " IS NOT ");
    
    return readableText;
  };
  
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          columnGap: "10px",
          marginBottom: "10px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >{`Layer Query - ${layer?.title || 'Layer'}`}</Typography>
        <IconButton
          onClick={handleCloseQuery}
          sx={{ width: "36px", height: "36px" }}
          id={`close-query-${layer?.id || 'layer'}`}
        >
          <Close />
        </IconButton>
      </Box>
      
      {/* Active Query Display */}
      {hasActiveQuery && (
        <Box 
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
            padding: "8px",
            backgroundColor: "#f5f5f5",
            borderRadius: "4px",
            border: "1px solid #e0e0e0"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <FilterList sx={{ marginRight: "8px", color: "#1976d2" }} />
            <Typography variant="subtitle1" fontWeight="bold">Filter sedang aktif:</Typography>
          </Box>
          <Tooltip title={activeQueryText} placement="top">
            <Typography 
              variant="body2" 
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {getReadableQueryText()}
            </Typography>
          </Tooltip>
        </Box>
      )}
      
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70%" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "70%",
            display: "flex",
            flexDirection: "column",
            rowGap: "5px",
            overflowY: "scroll",
            padding: "10px",
            border: "solid grey 1px",
            borderRadius: "5px",
            "&::-webkit-scrollbar": { width: "10px" },
            "&::-webkit-scrollbar-track": { background: "#00FFFFFF" },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "5px",
            },
            "&::-webkit-scrollbar-thumb:hover": { background: "#0000" },
          }}
        >
          {expressions.map((expression, index) => {
            if (index === 0) {
              return (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-evenly",
                    marginBottom: "8px",
                  }}
                  key={`box-expression-${index}`}
                  id={`box-expression-${layer?.id || 'layer'}-${index}`}
                >
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "20%",
                    }}
                    key={`typography-connection-${index}`}
                  >
                    WHERE
                  </Typography>
                  <Select
                    sx={{ width: "20%" }}
                    value={expression.field}
                    onChange={(event) => handleFieldChange(index, event)}
                    key={`select-field-${index}`}
                    MenuProps={{
                      style: {
                        maxHeight: "300px",
                      },
                    }}
                  >
                    {layerFields.map((field, i) => (
                      <MenuItem
                        value={field.name}
                        key={`field-menu-item-${index}-${i}`}
                      >
                        {field.alias || field.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Select
                    sx={{ width: "20%" }}
                    value={expression.operator}
                    onChange={(event) => handleOperatorChange(index, event)}
                    key={`select-operator-${index}`}
                  >
                    <MenuItem value="=" key={`operator-menu-item-${index}-IS`}>
                      IS
                    </MenuItem>
                    <MenuItem
                      value="<>"
                      key={`operator-menu-item-${index}-IS-NOT`}
                    >
                      IS NOT
                    </MenuItem>
                  </Select>
                  <Select
                    sx={{ width: "20%" }}
                    value={expression.value}
                    onChange={(event) => handleValueChange(index, event)}
                    key={`select-value-${index}`}
                    disabled={!expression.field}
                    MenuProps={{ style: { maxHeight: "300px" } }}
                  >
                    {expression.isLoading ? (
                      <MenuItem disabled key={`loading-${index}`}>
                        <CircularProgress
                          size={20}
                          sx={{ marginRight: "10px" }}
                        />
                        Loading...
                      </MenuItem>
                    ) : (
                      expression.possibleValues.map((possibleValue, i) => (
                        <MenuItem
                          value={possibleValue}
                          key={`possible-value-menu-item-${index}-${i}`}
                        >
                          {possibleValue !== null && possibleValue !== undefined 
                            ? possibleValue.toString() 
                            : "(null)"}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                  <IconButton
                    sx={{ width: "10%" }}
                    onClick={() => deleteExpression(index)}
                    key={`close-button-${index}`}
                  >
                    <Close />
                  </IconButton>
                </Box>
              );
            } else {
              return (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-evenly",
                    marginBottom: "8px",
                  }}
                  key={`box-expression-${index}`}
                >
                  <Select
                    sx={{ width: "20%" }}
                    value={expression.connection}
                    onChange={(event) => handleConnectionChange(index, event)}
                    key={`select-connection-${index}`}
                  >
                    <MenuItem
                      value="AND"
                      key={`connection-menu-item-${index}-AND`}
                    >
                      AND
                    </MenuItem>
                    <MenuItem value="OR" key={`connection-menu-item-${index}-OR`}>
                      OR
                    </MenuItem>
                  </Select>
                  <Select
                    sx={{ width: "20%" }}
                    value={expression.field}
                    onChange={(event) => handleFieldChange(index, event)}
                    key={`select-field-${index}`}
                    MenuProps={{
                      style: {
                        maxHeight: "300px",
                      },
                    }}
                  >
                    {layerFields.map((field, i) => (
                      <MenuItem
                        value={field.name}
                        key={`field-menu-item-${index}-${i}`}
                      >
                        {field.alias || field.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Select
                    sx={{ width: "20%" }}
                    value={expression.operator}
                    onChange={(event) => handleOperatorChange(index, event)}
                    key={`select-operator-${index}`}
                  >
                    <MenuItem value="=" key={`operator-menu-item-${index}-IS`}>
                      IS
                    </MenuItem>
                    <MenuItem
                      value="<>"
                      key={`operator-menu-item-${index}-IS-NOT`}
                    >
                      IS NOT
                    </MenuItem>
                  </Select>
                  <Select
                    sx={{ width: "20%" }}
                    value={expression.value}
                    onChange={(event) => handleValueChange(index, event)}
                    key={`select-value-${index}`}
                    disabled={!expression.field}
                    MenuProps={{
                      style: {
                        maxHeight: "300px",
                      },
                    }}
                  >
                    {expression.isLoading ? (
                      <MenuItem disabled key={`loading-${index}`}>
                        <CircularProgress
                          size={20}
                          sx={{ marginRight: "10px" }}
                        />
                        Loading...
                      </MenuItem>
                    ) : (
                      expression.possibleValues.map((possibleValue, i) => (
                        <MenuItem
                          value={possibleValue}
                          key={`possible-value-menu-item-${index}-${i}`}
                        >
                          {possibleValue !== null && possibleValue !== undefined 
                            ? possibleValue.toString() 
                            : "(null)"}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                  <IconButton
                    sx={{ width: "10%" }}
                    onClick={() => deleteExpression(index)}
                    key={`close-button-${index}`}
                  >
                    <Close />
                  </IconButton>
                </Box>
              );
            }
          })}
        </Box>
      )}
      
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Button
          onClick={addExpression}
          sx={{ backgroundColor: "#24a0ed", color: "black" }}
          id={`add-query-${layer?.id || 'layer'}`}
          disabled={loading}
        >
          Add Expression
        </Button>
        <Button
          onClick={applyQuery}
          sx={{ backgroundColor: "#ffc425", color: "black" }}
          id={`apply-query-${layer?.id || 'layer'}`}
          disabled={loading || expressions.some(expr => !expr.field || !expr.operator || !expr.value)}
        >
          Apply Query
        </Button>
        <Button
          onClick={resetQuery}
          sx={{ backgroundColor: "#ff1a1a", color: "black" }}
          id={`reset-query-${layer?.id || 'layer'}`}
          disabled={loading}
        >
          Reset Query
        </Button>
      </Box>
    </Box>
  );
};

export default LayerQuery;