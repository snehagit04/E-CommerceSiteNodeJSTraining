
module.exports = {
    allAccess: (req, res) => {
        res.send('All can access.')
    },
    userAccess: (req, res) => {
        res.send('Only user role can access.')
    },
    moderatorAccess: (req, res) => {
        res.send('Only moderator role can access.')
    },
    adminAccess: (req, res) => {
        res.send('only admin role can access')
    }
}