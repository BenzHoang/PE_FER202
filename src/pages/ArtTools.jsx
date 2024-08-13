import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/arttools.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const Dashboard = () => {
    const [arttools, setArtTools] = useState([]);
    const [arttool, setArtTool] = useState();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        fetchArtTools();
    }, []);

    const fetchArtTools = async () => {
        const res = await axios.get("https://66938d96c6be000fa07bfd64.mockapi.io/minhhlnse171857");
        if (res.status === 200) {
            setArtTools(res.data);
        }
    }


    const handleDelete = async (id) => {
        const res = await axios.delete(`https://66938d96c6be000fa07bfd64.mockapi.io/minhhlnse171857/${id}`);
        if (res.status === 200) {
            fetchArtTools();
            toast.success("Deleted Successfully");
        } else {
            toast.error("Delete: Error!");
        }
        handleClose();
    }

    const handleClickOpen = (id) => {
        setOpen(true);
        setArtTool(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="arttool-container">
            <div className="btn-add">
            <Link to={'/add'}>
                <button className='add-arttool-btn'>Add art tool</button>
            </Link>
        </div>
            <table className="arttool-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Art name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Glass Surface</th>
                        <th>Image</th>
                        <th>Brand</th>
                        <th>Limited Time Deal</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(arttools) && arttools.length > 0 ? (arttools.map((arttool) => (
                        <tr key={arttool.id}>
                            <td>{arttool.id}</td>
                            <td>{arttool.artName}</td>
                            <td>{arttool.price}</td>
                            <td>{arttool.description}</td>
                            <td>{arttool.glassSurface ? "true": "false"}</td>
                            <td><img src={arttool.image} alt={arttool.artName}/></td>
                            <td>{arttool.brand}</td>
                            <td>{arttool.limitedTimeDeal}</td>
                            <td>
                                <Link to={`/update/${arttool.id}`}><button> 
                                    <i className="fa fa-pen-to-square"></i>
                                    </button>
                                </Link>
                                <button onClick={() => handleClickOpen(arttool.id)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                                
                            </td>
                        </tr>
                    ))
                    ):(
                        <tr>
                            <td colSpan={9}>No arttools found</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do you want to delete art tool?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure that you want to delete a art tool with ID: {arttool}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={() => handleDelete(arttool)} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Dashboard;