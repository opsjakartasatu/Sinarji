import React, { useEffect } from 'react';

const TableauDashboard = () => {
  useEffect(() => {
    const divElement = document.getElementById('viz1740542688581');
    const vizElement = divElement.getElementsByTagName('object')[0];

    if (divElement.offsetWidth > 800) {
      vizElement.style.width = '8000px';
      vizElement.style.height = '10026px';
    } else if (divElement.offsetWidth > 500) {
      vizElement.style.width = '8000px';
      vizElement.style.height = '10026px';
    } else {
      vizElement.style.width = '100%';
      vizElement.style.height = '4477px';
    }

    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
  }, []);

  return (
    <div
      className="tableauPlaceholder"
      id="viz1740542688581"
      style={{ position: 'relative' }}
    >
      <noscript>
        <a href="#">
          <img
            alt="Dashboard GEMPAR"
            src="https://public.tableau.com/static/images/Pr/Project100HariGubernur-GerakanMasyarakatPunyaAPARGEMPAR/DashboardGEMPAR/1_rss.png"
            style={{ border: 'none' }}
          />
        </a>
      </noscript>
      <object className="tableauViz" style={{ display: 'none' }}>
        <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
        <param name="embed_code_version" value="3" />
        <param name="site_root" value="" />
        <param name="name" value="Project100HariGubernur-GerakanMasyarakatPunyaAPARGEMPAR/DashboardGEMPAR" />
        <param name="tabs" value="no" />
        <param name="toolbar" value="yes" />
        <param
          name="static_image"
          value="https://public.tableau.com/static/images/Pr/Project100HariGubernur-GerakanMasyarakatPunyaAPARGEMPAR/DashboardGEMPAR/1.png"
        />
        <param name="animate_transition" value="yes" />
        <param name="display_static_image" value="yes" />
        <param name="display_spinner" value="yes" />
        <param name="display_overlay" value="yes" />
        <param name="display_count" value="yes" />
        <param name="language" value="en-US" />
        <param name="filter" value="publish=yes" />
      </object>
    </div>
  );
};

export default TableauDashboard;
