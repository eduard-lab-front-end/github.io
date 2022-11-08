import { Link, Route, Routes, useParams, useNavigate } from "react-router-dom";
import { AppRoutes, redirectRoutes } from "../../components/routing/AppRoutes";
import { useEffect, useState } from "react";
import App from "../../App";
import { collection, addDoc, onSnapshot, doc, setDoc, deleteDoc } from "firebase/firestore";
import db, { storage } from "../../firebase";
import {ref, uploadBytesResumable, getDownloadURL, deleteObject} from "firebase/storage";


const IhorPage = () => {
    const {username} = useParams();
    const [ users, setUsers ] = useState(null)
    const [ files, setFiles ] = useState(null)
    const navigate = useNavigate();
    const addInfo = async () => {
        const collectionRef = collection(db, "users");
        const docRef = await addDoc(collectionRef, {
            name: "Bobby",
            role: "student"
        })
        console.log(docRef)
    }
    const getInfo = async () => {
        const collectionRef = collection(db, "users");
        onSnapshot(collectionRef, (snapshot) => {
            setUsers(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        })
    }
    const handleEdit = async (user, collectionName) => {
        const docRef = doc(db, collectionName, user.id)
        delete user.id
        await setDoc(docRef, {
            ...user,
            role: "admin",
            ...files
        })
        setFiles(null)
    }
    const deleteImgRef = async (user) => {
        const docRef = doc(db, "users", user.id)
        delete user.url
        delete user.imgName
        delete user.id
        await setDoc(docRef, {
            ...user,
        })
    }
    const handleDelete = async (user, collectionName) => {
        const docRef = doc(db, collectionName, user.id)
        await deleteDoc(docRef)
    }
    const handleUpload =(e)=> {
       // setFiles(e.target.files[0].name)
        const storageRef = ref(storage, `/users/${e.target.files[0].name}`)
        const uploadData = uploadBytesResumable(storageRef, e.target.files[0])

        uploadData.on("state_changed", (snapshot) => {
                const prog = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log(prog);
            }, (err) => console.log(err),
            () => {
                getDownloadURL(uploadData.snapshot.ref)
                    .then(url => {
                        setFiles({url, imgName: e.target.files[0].name})
                        console.log(url)
                    })
            }
        )
    }

    const handleDeleteImage = (user) => {
        const desertRef = ref(storage, `users/${user.imgName}`);

        deleteObject(desertRef).then(() => {
            console.log("Ok")
            deleteImgRef(user)
        }).catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        users && console.log(users)
    }, [ users ])

    useEffect(() => {
        console.log(files)
    }, [ files ])

    return (
        <>
            <h1>Ihor page</h1>
            <button onClick={addInfo}>Add Info</button>
            <button onClick={getInfo}>Get Info</button>
            <input type="file" onChange={handleUpload}/>
            {users && users.map(user => (
                <p> {user.name} is {user.role}
                    {user?.url && <img src={user?.url} alt={user?.imgName} style={{width: "100px"}}/>}
                    <button onClick={() => handleEdit(user, "users")}>
                        Edit
                    </button>
                    <button onClick={() => handleDelete(user, "users")}>
                        Delete
                    </button>
                    <button onClick={() => handleDeleteImage(user, "users")}>
                        Delete Image
                    </button>
                </p>
            ))}
            {/*<Link to={redirectRoutes.PHOTOS}>PHOTOS</Link>*/}
            {/*<br/>*/}
            {/*<Link to={`${redirectRoutes.IHOR}${AppRoutes.FRIENDS}`}>FRIENDS</Link>*/}
            {/*<Routes>*/}
            {/*    <Route path={AppRoutes.PHOTOS} element={<h3>Photos</h3>}/>*/}
            {/*    <Route path={AppRoutes.FRIENDS} element={<h3>Friends</h3>}/>*/}
            {/*</Routes>*/}
        </>

    )
}

export default IhorPage;
