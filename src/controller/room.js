import {findIndex} from "../common/findIndex.js"

const Rooms = [
    {
        room_id: 1,
        room_name: "Luxuary",
        booked_status: true,
        price_for_1_hours: 8000
      },
      {
        room_id: 2,
        room_name: "Premium",
        booked_status: true,
        price_for_1_hours: 6000
      },
      {
        room_id: 3,
        room_name: "FirstClass",
        booked_status: true,
        price_for_1_hours: 4000
      },
      {
        room_id: 4,
        room_name: "Normal",
        booked_status: false,
        price_for_1_hours: 2000
      }
]

const Customer = [
    {
     room_id :1,
     customer_id:1,
    name:"Swathimeenal",
    email:"swathi@gmail.com",
    phone_No:"9962355579",
    date:"15/02/2024",
    Check_In:"08:00:00 a.m",
    Check_Out:"10:00:00 a.m"
    },
    {
        room_id :2,
        customer_id:2,
       name:"meenal",
       email:"meenal@gmail.com",
       phone_No:"9962355578",
       date:"17/02/2024",
       Check_In:"04:00:00 p.m",
       Check_Out:"10:00:00 p.m"
    },
    {
       room_id :3,
       customer_id:3,
       name:"Geetha",
       email:"geetha@gmail.com",
       phone_No:"9962355479",
       date:"15/02/2024",
       Check_In:"08:45:00 a.m",
       Check_Out:"10:00:00 p.m"
    }

]

const BookedRooms = (req, res) => 
{
    try
    {
        let BookedRoom = [];
        for (let i=o;i<Rooms.length;i++)
        {
            for(let j=0; j<Customer.length;j++)
            {
                if (Rooms[i].room_id === Customer[j].room_id)
                {
                    BookedRoom.push({
                        Room_Name: Rooms[i].room_name,
                        Booked_Status: Rooms[i].booked_status,
                        customer: Customer[j]   
                    })
                }
            }
            if (Rooms[i].booked_status === false) {
                BookedRoom.push(Rooms[i])
            }
         }
    res.status(200).send(BookedRoom)  
    }
    catch(error)
    {
        res.status(500).send(
            {
            message: "Internal Server Error",
            })
    }
}

const allCustomer =(req,res)=>{
    try
    {
        let BookedRoom = [];
        for (let i=o;i<Rooms.length;i++)
        {
            for(let j=0; j<Customer.length;j++)
            {
                if (Rooms[i].room_id === Customer[j].room_id)
                {
                    BookedRoom.push({
                        Customer : Customer[j].name,
                        Room_Name: Rooms[i].room_name,
                        Date : Customer[j].date,
                        Booked_Status: Rooms[i].booked_status,
                        Check_In: Customer[j].Check_In,
                        Check_Out: Customer[j].Check_Out
                         
                    })
                }
            }
            if (Rooms[i].booked_status === false) {
                BookedRoom.push(Rooms[i])
            }
         }
    res.status(200).send(BookedRoom) 

    }
    catch(error)
    {
        res.status(500).send(
            {
            message: "Internal Server Error",
            })
    }
}

const CreateRoom = (req,res) => {
    try {
        const id = Rooms.length ? Rooms[Rooms.length - 1].room_id + 1 : 1;
        req.body.room_id = id;
        req.body.room_name = `room-${id}`;
        req.body.booked_status = false;
    
        Rooms.push(req.body);
        console.log(req.body);
        res.status(200).send({
          message: "Room Added Successfully",
        })
      } catch (error) {
        res.status(500).send({
          message: "Internal Server Error",
        })
      }
}

const DeleteRoom = (req, res) => {
    try {
      const { id } = req.params;
      const index = findIndex(Rooms, id);
      if (index !== -1) {
        console.log("if two");
        Rooms.splice(index, 1);
        res.status(200).send({
          message: "Room Deleted Successfully",
        });
      } else {
        res.status(400).send({
          message: "Invalid Room Id",
        })
      }
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
      })
    }
  }


  const Booking = (req, res) => {
    try {
      const { id } = req.params;
      const Room_id = +id
      const index = findIndex(Rooms, id);
      const temp = {...Rooms[index]}
      temp.booked_status = true
      
      if (index !== -1 && Rooms[index].booked_status == false) {
        Rooms.splice(index,1,temp) // Room status get changed
           const {name, date, Check_In, Check_Out} = req.body
        const id = Customer.length? Customer[Customer.length -1].customer_id + 1 : 1;
        const newCustomer = {
          customer_id : id,
          name, 
          email,
          phone_No,
          date,
          Check_In,
          Check_Out,
          room_id : Room_id
        }
        Customer.push(newCustomer) //room booking customer details collect
        res.status(200).send({
          message: "Room Booking Successfully",
        })
      } else if (Rooms[index].booked_status == true) {
        res.status(500).send({
          messag: "This Room is already booking",
        })
      }
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
      })
    }
  }

  export default { 
    BookedRooms, 
    allCustomer, 
    CreateRoom, 
    DeleteRoom, 
    Booking 
  }