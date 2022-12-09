import { Link, Route, Routes, useParams, useNavigate } from "react-router-dom";
import { AppRoutes, redirectRoutes } from "../../components/routing/AppRoutes";
import { useEffect, useState } from "react";
import App from "../../App";
import { collection, addDoc, onSnapshot, doc, setDoc, deleteDoc } from "firebase/firestore";
import db, { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import login from "../Login/Login";


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
    const handleUpload = (e) => {
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

    const getQuantity = (arr) => {
        const set = new Set()
        const q = {}
        arr.forEach((item) => {
            if (set.has(item)) {
                q[item] = q[item] + 1;
            } else {
                set.add(item)
                q[item] = 1;
            }
        })
        // console.log(Object.keys(q).reduce((a, b) => q[a] > q[b] ? a : b))
    }
    const calculate = () => {
        const arr = [ "ababab", "ababbbbbb", "1cccdddd23", "1234dfdfdfdfdfdfddddcccccccccccc567" ]
        let totalstring = "";
        arr.forEach((item) => {
            totalstring = totalstring.concat(item)
        })
        const splitArr = totalstring.split("")
        getQuantity(splitArr)
    }

    // const set = new Map();
    // set.set("name", 'Ihor')
    // console.log(set)
    // set.set("name", 'Eduard')
    // console.log(set)
    // set.set("name", 'Ihor')
    // console.log(set)
    // console.log(set.get("name"))


    // let set = new Set();
    // let arr = [ {name: "John", role: "admin"}, {name: "John"}, {name: "Pete"}, {name: "Pete"}, {name: "Mary"}, {name: "Mary"} ]
    // // let arr = ["John" , "John", "Pete" , "Pete" , "Mary"  ]
    // // let john = { name: "John" };
    // // let pete = { name: "Pete" };
    // // let mary = { name: "Mary" };
    //
    // let noDubl = [];
    // arr.forEach((user, index) => {
    //     !noDubl?.some((item) => JSON.stringify(item) === JSON.stringify(user))
    //        && noDubl.push(user)
    // })
    // console.log(noDubl)
    // arr.forEach((item) => set.add(item))

    // console.log(4);
    //
    // setTimeout(() => {
    //     Promise.resolve(1).then((val) => {
    //         console.log(5);
    //     });
    // });
    //
    // Promise.resolve(1).then((val) => {
    //     console.log(1);
    // });
    //
    // console.log(3);
    // console.log(a)
    // var a = 5;
    // //
    // function testClose() {
    //     console.log(a)
    //     console.log("inside func");
    //     if (a) {
    //         console.log(a);
    //         var a = 100;
    //     }
    // }
    // testClose();

    // console.log(amigo)
    // function dance() {
    //     const message = "Dance ";
    //     if (true) {
    //         var amigo = "Dmytro";
    //         console.log(message);
    //     }
    //     console.log(amigo);
    // }
    // dance();


    const company = {
        name: "TechWhat",
        employees: 2000,
        location: "Lviv",
        year: 2000,
        employeeSatisfaction: 'high',
        companyFullInfo() {
            return `${this.name} was estabished in ${this.year}`;
        },
        companyPartInfo: () => `${this.name} has employee satisfaction on ${this.employeeSatisfaction} level`,
        detailedInfo() {
            return () => `${this.name} was located in ${this.location}`;
        },
        superDetailedInfo() {
            return function () {
                return `${this.name} has ${this.employees}`;
            };
        },
    };

    // const getSatisfactionLevel = company.employeeSatisfaction;
    // getSatisfactionLevel();

    // const getcompanyFullInfo = company.companyFullInfo;
    // console.log(getcompanyFullInfo.call(company));
    //
    // const getcompanyPartInfo = company.companyPartInfo;
    // getcompanyPartInfo();
    //
    // const getdetailedInfo = company.detailedInfo;
    // getdetailedInfo()
    //
    // const getsuperDetailedInfo= company.superDetailedInfo;
    // getsuperDetailedInfo()



    // setTimeout(() => console.log(0));
// считаем гостей, некоторые приходят несколько раз
//     set.add(john);
//     set.add(pete);
//     set.add(mary);
//     set.add(john);
//     set.add(mary);

// set хранит только 3 уникальных значения
//     alert(set.size); // 3

    // for (let user of set) {
    //     alert(user.name); // John (потом Pete и Mary)
    // }


    // const obj ={
    //     name: "ihor",
    //     role: "mentor"
    // }
    // console.log(
    // Object.entries(obj)
    // )

    // let str = "123"
    // console.log(str[1])

    function pow(x, n) {
        debugger;
        if (n == 1) {
            return x;
        } else {
            return x * pow(x, n - 1);
        }
    }

    let list = {
        value: 1,
        next: {
            value: 2,
            next: {
                value: 3,
                next: {
                    value: 4,
                    next: null
                }
            }
        }
    };
    //
    // let total=0
    // const calcValue = (obj) => {
    //     total += 2*obj.value
    //     if(obj.next){
    //         calcValue(obj.next)
    //     }
    // }
    // calcValue(list);
    //
    // console.log(total)

    // pow(2, 3)
    //
    // 2*pow(2, 3-1)
    //
    // 2 * 2 * pow(2, 2-1)
    // 2 * 2 * 2
    // //
    //
    // const sum = (a)=> a*2
    // const compose = (...functions) =>{
    //     console.log(functions)
    //    return (args) =>
    //         functions.reduceRight((arg,fn) => fn(arg),args);
    // }

    // const f = () => {
    //     var name = 1
    // //     return name
    // // }
    // var name = "Chropme"
    // function makeFunc() {
    //     // console.log(this)
    //     var name = 0
    //
    //     function displayName() {
    //         // console.log(this)
    //         // alert(name);
    //         name +=1
    //         // setInterval(()=> name+=1, 1000)
    //         console.log("desc", name)
    //     }
    //
    //     return displayName;
    // };
    //
    // let myFunc = makeFunc();
    // myFunc();
    // myFunc();
    // myFunc();
    //
    // let myFunc1 = makeFunc();
    // myFunc1();
    // myFunc1();
    // myFunc1();
    // // displayName();
    //
    //
    // const createBase = (value) => (arg) => (b) => console.log(value+arg+b)

    //     return function (arg){
    //         console.log(value+arg)
    //     }
    // }
    // var addSix = createBase(6);
    // addSix(10)(1);// 16
    // addSix(21)(1); //27


function sd(a){
    this.a = a
    // a=30
    console.log(a)
    console.log(this.a)
}
sd(3)

// const compose = (a, b) =>(value)=> a(b(value))

    // console.log(compose(sum,sum,sum)(2))

    // console.log(sum(sum(2)))

    useEffect(() => {
        calculate();
    }, [])
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
