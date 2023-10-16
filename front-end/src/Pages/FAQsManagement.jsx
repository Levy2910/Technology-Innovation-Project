/*FAQs Management Page
Junaid Saleem 103824753
Last edited 15/10/2023*/
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { apiUrl } from '../Contants';
import axios from 'axios';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        margin: '1rem',
    },
});

const apiPaths = {
    getFaqs: '/listFaq',
    addFaq: '/addFaq',
    updateFaq: '/updateFaq/',
    deleteFaq: '/deleteFaq/'
}

function FAQManagement() {
    const classes = useStyles();
    const [faqs, setFAQs] = useState([]);
    const [editingFAQId, setEditingFAQId] = useState(null);
    const [currentFAQ, setCurrentFAQ] = useState({
        faq_id: null,
        question: '',
        answer: '',
    });

    const fetchFAQs = () => {
        axios.get(apiUrl + apiPaths.getFaqs)
            .then((response) => {
                // Handle the successful response here
                setFAQs(response.data);
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error('Error:', error);
            });
    };

    const addFAQ = () => {
        const newFAQ = {
            question: currentFAQ.question,
            answer: currentFAQ.answer,
        };
        axios.post(apiUrl + apiPaths.addFaq, newFAQ)
            .then((response) => {
                fetchFAQs();
                closeModal(); // Close the modal after adding the user
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error('Error:', error);
            });
        setCurrentFAQ({
            faq_id: null,
            question: '',
            answer: '',
        });
    };

    const updateFAQ = (updatedFAQ) => {
        axios.post(apiUrl + apiPaths.updateFaq + updatedFAQ.faq_id, { question: updatedFAQ.question, answer: updatedFAQ.answer })
            .then((response) => {
                fetchFAQs();
                closeModal(); // Close the modal after adding the user
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error('Error:', error);
            });
    };

    const deleteFAQ = (faqID) => {
        axios.delete(apiUrl + apiPaths.deleteFaq + faqID)
            .then((response) => {
                fetchFAQs();
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        fetchFAQs();
    }, []);

    // State for the modal
    const [isModalOpen, setModalOpen] = useState(false);

    const handleEdit = (faqId) => {
        setEditingFAQId(faqId);
        const faqToEdit = faqs.find((faq) => faq.faq_id === faqId);
        setCurrentFAQ(faqToEdit);
    };

    const handleDelete = (faqId) => {
        deleteFAQ(faqId);
    };

    // Function to open the modal
    const openModal = () => {
        setModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalOpen(false);
    };

    // Function to save the new FAQ and close the modal
    const handleSaveModal = () => {
        addFAQ();
    };

    const handleSave = (faqId) => {
        const updatedFAQ = {
            faq_id: faqId,
            ...currentFAQ
        };

        updateFAQ(updatedFAQ);
        setEditingFAQId(null);
        setCurrentFAQ({
            faq_id: null,
            question: '',
            answer: ''
        });
    };

    return (
        <div>
            <h2>FAQ Management</h2>

            {/* Button to open the modal */}
            <Button variant="outlined" onClick={openModal} style={{ marginTop: 10, marginBottom: 10 }}>
                Add FAQ
            </Button>

            {/* Modal for adding FAQs */}
            <Dialog open={isModalOpen} onClose={closeModal}>
                <DialogTitle>Add FAQ</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Question"
                        value={currentFAQ.question}
                        onChange={(e) =>
                            setCurrentFAQ({ ...currentFAQ, question: e.target.value })
                        }
                    />
                    <TextField
                        label="Answer"
                        value={currentFAQ.answer}
                        onChange={(e) =>
                            setCurrentFAQ({ ...currentFAQ, answer: e.target.value })
                        }
                        style={{ marginLeft: 10 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button onClick={handleSaveModal}>Add</Button>
                </DialogActions>
            </Dialog>

            {/* FAQ table */}
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="FAQ table">
                    <TableHead>
                        <TableRow>
                            <TableCell>FAQ ID</TableCell>
                            <TableCell>Question</TableCell>
                            <TableCell>Answer</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {faqs.map((faq) => (
                            <TableRow key={faq.faq_id}>
                                <TableCell>{faq.faq_id}</TableCell>
                                <TableCell>
                                    {faq.faq_id === editingFAQId ? (
                                        <TextField
                                            value={currentFAQ.question}
                                            onChange={(e) =>
                                                setCurrentFAQ({ ...currentFAQ, question: e.target.value })
                                            }
                                        />
                                    ) : (
                                        faq.question
                                    )}
                                </TableCell>
                                <TableCell>
                                    {faq.faq_id === editingFAQId ? (
                                        <TextField
                                            value={currentFAQ.answer}
                                            onChange={(e) =>
                                                setCurrentFAQ({ ...currentFAQ, answer: e.target.value })
                                            }
                                        />
                                    ) : (
                                        faq.answer
                                    )}
                                </TableCell>
                                <TableCell>
                                    {faq.faq_id === editingFAQId ? (
                                        <Button onClick={() => handleSave(faq.faq_id)}>Save</Button>
                                    ) : (
                                        <>
                                            <Button onClick={() => handleEdit(faq.faq_id)}>Edit</Button>
                                            <IconButton
                                                onClick={() => handleDelete(faq.faq_id)}
                                                style={{ color: 'lightcoral' }}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default FAQManagement;
