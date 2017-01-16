import mongoose from 'mongoose';

const User = mongoose.model('user');

export function getAllUsers(req, res) {
    var user  = new User({
        name: 'test'
    });

    user.save();
  return res.json({ title: 'Welcome message' });
}

export function getUsers(req, res) {
    if (!req.cookies.id) {
        return User
            .find()
            .sort({date: -1})
            .limit(6)
            .exec(function (err, result) {
                if (err) res.end("error");
                else res.end(JSON.stringify(result));
            });
    }

    return User.findById(req.cookies.id)
        .then(user => {
            const { location } = user; // const location = user.location;
            const { coordinates } = location;
            return User.find({
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates
                        },
                        $maxDistance: 1000
                    }
                }
            }).sort({date: -1}).limit(6).exec();
        })
        .then((users) => {
        res.end(JSON.stringify(users));
        });
}

export function setUsers(req, res) {
    if (!req.cookies.id) {
        if (!req.body.name) res.end('nameError');
        else if (!req.body.coordinates) res.end('noLoc');
        else {
            const newUser = new User(
                {
                    _id: mongoose.Types.ObjectId(),
                    name: req.body.name,
                    location: {
                        type: "Point",
                        coordinates: JSON.parse(req.body.coordinates)
                    },
                    date: new Date()
                }
            );

            newUser.save(function (err, user) {
                if (err) res.end("dbError");
                else {
                    const date = (new Date(Date.now() + 3 * 60 * 60 * 1000)).toUTCString();
                    res.setHeader('Set-Cookie', 'id='+user._id+';'+
                        ' Expires=' + date + '; Path=/; HttpOnly');
                    res.end("Success");
                }
            });
        }

    } else {
        const userId = req.cookies.id;

        User.update(
            {_id:req.cookies.id},
            {$set:{
                name: req.body.name,
                location: {
                    type: "Point",
                    coordinates: req.body.coordinates
                },
                date: new Date()
            }}
        )
            .exec(function(err, user){
                if (err) res.end(err);
                else res.end("updated");
            });
    }
}