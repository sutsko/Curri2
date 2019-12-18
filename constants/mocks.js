const categories = [
 {
     //I am thinking we can edit the ID and name to macth the different courses
     id: '1. Semester',
     name: '1. Semester',
     //With tags we set, i think, in which of the "faner" these should show up in. Inpirations or favorites.
     tags: ['semesters', 'your courses'],
     //Count is the number showing how many of each product there is
     count: 147,
     image: require ('../assets/icons_semester/first_semester.png')
 },
 {
    id: '2. Semester',
    name: '2. Semester',
    tags: ['semesters', 'favorites'],
    count: 16,
    image: require ('../assets/icons_semester/second_semester.png')
 },
 {
    id: '3. Semester',
    name: '3. Semester',
    tags: ['semesters', 'your courses'],
    count: 68,
    image: require ('../assets/icons_semester/third_semester.png')
 },
 {
    id: '4. Semester',
    name: '4. Semester',
    tags: ['semesters', 'favorites'],
    count: 17,
    image: require ('../assets/icons_semester/fourth_semester.png')
 },
 {
    id: '5. Semester',
    name: '5. Semester',
    tags: ['semesters', 'favorites'],
    count: 47,
    image: require ('../assets/icons_semester/fifth_semester.png')
 },
 {
    id: '6. Semester',
    name: '6. Semester',
    tags: ['semesters', 'favorites'],
    count: 17,
    image: require ('../assets/icons_semester/sixt_semester.png')
 }
];

const products = [
    {
        id: 1,
        name:'HA(it) Mikroøkonomi, opdateret pensum 2019',
        description:'This course covers the most important foundation concepts in microeconomics necessary for application in more advanced models. Principles and theories discussed in this course can also be applied in real life decision making.',
        tags: ['Mikroøkonomi', 'Pensum: 2019', 'Øvelser'],
        images: [
            /*These could be the models covered in the video - 
            Where +x is the ones that the students will have to 
            buy into to see*/
            require('../assets/images/Micro_graph_1.png'),
            require('../assets/images/Micro_Graph_2.jpg'),
            require('../assets/images/Micro_Graph_3.jpg'),
            //Showing only 3 images, show +6 for the rest
            require('../assets/images/Micro_graph_1.png'),
            require('../assets/images/Micro_Graph_2.jpg'),
            require('../assets/images/Micro_Graph_3.jpg'),
            require('../assets/images/Micro_graph_1.png'),
            require('../assets/images/Micro_Graph_2.jpg'),
            require('../assets/images/Micro_Graph_3.jpg'),
        ]
    }

];


//For the profile, maybe there should be an "course" to go together with "location". Eg Location:CBS Course:HAIT
const profile= {
    username: 'Olli',
    //Location could be their university
    location: 'CBS',
    //This should be their student email
    email: 'student@cbs.dk',
    //This should be their user photo
    avatar: require ('../assets/images/Oliver.png'),
    //Budget and monthly cap could maybe 
    budget: 1000,
    monthly_cap: 5000,
    notificattion: true,
    //This could be when the new semester comes, what courses and their ratings there
    newsletter:false,

};



export {
    categories,
    products,
    profile,
}