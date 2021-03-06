exports.getGenerals = (req, res) => {
    const user = req.user;
    res.status(200).json(user);
};

exports.getMaps = (req, res) => {
    const user = req.user;
    const maps = [
        {id: 'm32301232323223', name: 'Trips Maps'},
        {id: 'v342343234', name: 'WishList'},
    ];
    setTimeout(() => {
        res.status(200).json(maps);
    }, 900);
};

exports.getStats = (req, res) => {
    const user = req.user;
    const stats = {
        maps: 1,
        countries: 20,
        photos: 521,
        videos: 92
    };
    setTimeout(() => {
        res.status(500).json('There was an error with your request');
    }, 1200);
    // res.status(200).json(stats);
};
