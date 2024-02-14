const homepage = (req, res) => {
    res.status(200).send(`
    <div>
    <h1>Welcome to Hall Booking Api using NodeJS </h1>
    <ul>
        <li>Get all Rooms = endpoint: /rooms</li>
        <li>New Hall Booking = endpoint/:id </li>
        <li>Take a list of Booked rooms = endpoint: /rooms/customer</li>
        <li>Create a new room = endpoint: /rooms/</li>
    <ul/>
    <div/> `)
}