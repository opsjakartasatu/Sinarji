import { Box, Modal } from '@mui/material'
import React from 'react'

const AddSurveyor = ({ addSurveyorOpen, toggleModal }) => {
    return (
        <Modal open={addSurveyorOpen} onClose={toggleModal}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
                AddSurveyor
            </Box>
        </Modal>
    )
}

export default AddSurveyor