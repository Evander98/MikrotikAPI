const RouterOSClient = require('routeros-client').RouterOSClient;


module.exports = {
    onConnect : (req, res) => {
        const conn = new RouterOSClient({
            host : req.query.host,
            user : req.query.user,
            password : req.query.password
        });

        conn.connect()
        .then((client) => {
            var data = {
                host : client.rosApi.host,
                user : client.rosApi.user,
                password : client.rosApi.password,
                error : false
            }
            res.send(data)
            conn.close()
        })
        .catch((err) => {
            console.log(err)
            res.send({error : true, msg : err.errno == 'ENOTFOUND' ? "Can't find host" : err.message })
        })
        
    },
    getAllUser : (req, res) => {
        const conn = new RouterOSClient({
            host : req.body.host,
            user : req.body.user,
            password : req.body.password
        })

        conn.connect()
        .then((client) => {
            client.menu('/ip hotspot user').getAll()
            .then((data) => {
                res.send(data)
                // res.send(data.slice(1, data.length))
                conn.close()
            })
            .catch((err) => {
                res.send(err)
                conn.close()
            })
        })
        .catch((err) => {
            res.send({error : true, msg : err.message})
        })
    },
    getUser : (req, res) => {
        const conn = new RouterOSClient({
            host : req.body.host,
            user : req.body.user,
            password : req.body.password
        })

        conn.connect()
        .then((client) => {
            client.menu('/ip hotspot user').where("name", req.body.hotspotUserName).get()
            .then((data) => {
                res.send(data)
                // res.send(data.slice(1, data.length))
                conn.close()
            })
            .catch((err) => {
                res.send(err)
                conn.close()
            })
        })
        .catch((err) => {
            res.send({error : true, msg : err.message})
        })
    },
    addHotspotUser : (req, res) => {
        const conn = new RouterOSClient({
            host : req.body.host,
            user : req.body.user,
            password : req.body.password
        });

        conn.connect()
        .then((client) => {
            client.menu('/ip hotspot user').where("name", req.body.hotspotUserData.name).get()
            .then((result) => {
                if(result.length > 0){
                    console.log({error : true, msg : 'User already exist'})
                    res.send({error : true, msg : 'User already exist'})
                    conn.close()
                } else{
                    client.menu('/ip hotspot user add').add(req.body.hotspotUserData)
                    .then((result2) => {
                        res.send('User Added')
                        // console.log('added')
                        conn.close()
                    })
                    .catch((err) => {
                        res.send(err)
                        console.log(err)
                        conn.close()
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
        })
        .catch((err) => {
            console.log(err)
            res.send({error : true, msg : err.message})
        });

        //Kirim object ini dari frontend
        // {
        //     "host" : "192.168.88.1",
        //     "user" : "admin",
        //     "password" : "",
        //     "hotspotUserData" : {
        //         "server": "all",
        //         "name": "user27",
        //         "password": "123456",
        //         "address" : "0.0.0.0",
        //         "macAddress": "00:00:00:00:00:00",
        //         "profile": "default",
        //         "email": "",
        //         "limitUptime": 86400,
        //         "limitBytesIn": 0,
        //         "limitBytesOut": 0,
        //         "limitBytesTotal": 0,
        //         "disabled": false,
        //         "comment": ""
        //     }
        // }
    },
    removeHotspotUser : (req, res) => {
        const conn = new RouterOSClient({
            host: req.body.host,
            user: req.body.user,
            password: req.body.password
        });
        
        conn.connect()
        .then((client) => {
            client.menu('/ip hotspot user').remove(req.body.hotspotUserId)
            .then(() => {
                res.send('User Removed')
                conn.close()
            })
            .catch((err) => {
                res.send("User Doesn't Exist")
                conn.close()
            })
        })
        .catch((err) => {
            res.send({error : true, msg : err.message})
            console.log(err)
        })
    },
    hotspotUserLength : (req, res) => {
        const conn = new RouterOSClient({
            host : req.body.host,
            user : req.body.user,
            password : req.body.password
        })
        
        conn.connect()
        .then((client) => {
            client.menu('/ip hotspot user print').get()
            .then((data) => {
                res.send(data.length.toString())
                conn.close()
            })
            .catch((err) => {
                console.log(err)
                conn.close()
            })
        })
        .catch((err) => {
            res.send({error : true, msg : err.message})
        })
    },
    hotspotHostLength : (req, res) => {
        const conn = new RouterOSClient({
            host : req.body.host,
            user : req.body.user,
            password : req.body.password
        })

        conn.connect()
        .then((client) => {
            client.menu('/ip hotspot host print').get()
            .then((data) => {
                res.send(data.length.toString())
                conn.close()
            })
            .catch((err) => {
                console.log(err)
                conn.close()
            })
        })
        .catch((err) => {
            res.send({error : true, msg : err.message})
        })
    },
    getHotspotHost : (req, res) => {
        const conn = new RouterOSClient({
            host : req.body.host,
            user : req.body.user,
            password : req.body.password
        })

        conn.connect()
        .then((client) => {
            client.menu('/ip hotspot host print').get()
            .then((data) => {
                res.send(data)
                console.log(data)
                conn.close()
            })
            .catch((err) => {
                console.log(err)
                conn.close()
            })
        })
        .catch((err) => {
            res.send({error : true, msg : err.message})
        })
    },
    hotspotActiveLength : (req, res) => {
        const conn = new RouterOSClient({
            host : req.body.host,
            user : req.body.user,
            password : req.body.password
        })

        conn.connect()
        .then((client) => {
            client.menu('/ip hotspot active print').get()
            .then((data) => {
                res.send(data.length.toString())
                conn.close()
            })
            .catch((err) => {
                console.log(err)
                conn.close()
            })
        })
        .catch((err) => {
            res.send({error : true, msg : err.message})
        })
    },
    getHotspotActive : (req, res) => {
        const conn = new RouterOSClient({
            host : req.body.host,
            user : req.body.user,
            password : req.body.password
        })

        conn.connect()
        .then((client) => {
            client.menu('/ip hotspot active print').get()
            .then((data) => {
                res.send(data)
                console.length(data)
                conn.close()
            })
            .catch((err) => {
                console.log(err)
                conn.close()
            })
        })
        .catch((err) => {
            res.send({error : true, msg : err.message})
        })
    },
    serverList : (req, res) => {
        const conn = new RouterOSClient({
            host : req.body.host,
            user : req.body.user,
            password : req.body.password
        })

        conn.connect()
        .then((client) => {
            client.menu('/ip hotspot print').get()
            .then((data) => {
                res.send(data.map((val) => {
                    return val.name
                }))
                conn.close()
            })
            .catch((err) => {
                console.log(err)
                conn.close()
            })
        })
        .catch((err) => {
            res.send({error : true, msg : err.message})
        })
    },
    profileList : (req, res) => {
        const conn = new RouterOSClient({
            host : req.body.host,
            user : req.body.user,
            password : req.body.password
        })

        conn.connect()
        .then((client) => {
            client.menu('/ip hotspot user profile print').get()
            .then((data) => {
                res.send(data.map((val => {
                    return val.name
                })))
                conn.close()
            })
            .catch((err) => {
                console.log(err)
                conn.close()
            })
        })
        .catch((err) => {
            res.send({error : true, msg : err.message})
        })
    },
    allProfile : (req, res) => {
        const conn = new RouterOSClient({
            host : req.body.host,
            user : req.body.user,
            password : req.body.password
        })
        conn.connect()
        .then((client) => {
            client.menu('/ip hotspot user profile print').get()
            .then((data) => {
                res.send(data)
                conn.close()
            })
            .catch((err) => {
                console.log(err)
                conn.close()
            })
        })
        .catch((err) => {
            res.send({error : true, msg : err.message})
        })
    },
    profileLength : (req, res) => {
        const conn = new RouterOSClient({
            host : req.body.host,
            user : req.body.user,
            password : req.body.password
        })
        conn.connect()
        .then((client) => {
            client.menu('/ip hotspot user profile print').get()
            .then((data) => {
                res.send(data.length.toString())
                conn.close()
            })
            .catch((err) => {
                console.log(err)
                conn.close()
            })
        })
        .catch((err) => {
            res.send({error : true, msg : err.message})
        })
    },
    activateHotpsotUser : (req, res) => {
        const conn = new RouterOSClient({
            host : req.body.host,
            user : req.body.user,
            password : req.body.password
        })
        conn.connect()
        .then((client) => {
            client.menu(`/ip hotspot user`).where("id", req.body.hotspotUserId).update({disabled : req.body.disabled})
            .then(() => {
                res.send("Disabled : " + req.body.disabled)
                conn.close()
            })
            .catch((err) => {
                console.log(err)
                conn.close()
            })
        })
        .catch((err) => {
            res.send({error : true, msg : err.message})
        })
    }
}