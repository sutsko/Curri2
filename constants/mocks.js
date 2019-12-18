const categories = [
 {
     //I am thinking we can edit the ID and name to macth the different courses
     id: 'plants',
     name: '1. Semester',
     //With tags we set, i think, in which of the "faner" these should show up in. Inpirations or favorites.
     tags: ['semesters', 'your courses'],
     //Count is the number showing how many of each product there is
     count: 147,
     image: require ('../assets/icons_semester/first_semester.png')
 },
 {
    id: 'seeds',
    name: '2. Semester',
    tags: ['semesters', 'favorites'],
    count: 16,
    image: require ('../assets/icons_semester/second_semester.png')
 },
 {
    id: 'flowers',
    name: '3. Semester',
    tags: ['semesters', 'your courses'],
    count: 68,
    image: require ('../assets/icons_semester/third_semester.png')
 },
 {
    id: 'sprayers',
    name: '4. Semester',
    tags: ['semesters', 'favorites'],
    count: 17,
    image: require ('../assets/icons_semester/fourth_semester.png')
 },
 {
    id: 'pots',
    name: '5. Semester',
    tags: ['semesters', 'favorites'],
    count: 47,
    image: require ('../assets/icons_semester/fifth_semester.png')
 },
 {
    id: 'fertilizers',
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

const explore = [
    //images
    require('../assets/images/explore_1.png'),
    require('../assets/images/explore_2.png'),
    require('../assets/images/explore_3.png'),
    require('../assets/images/explore_4.png'),
    require('../assets/images/explore_5.png'),
    require('../assets/images/explore_6.png'),
]

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

const courses= {
    id: '',
    name: 'Olli',
    //Location could be their university
    subject: 'CBS',
    description:'',
    //This should be their student email
    teacher: 'student@cbs.dk',
    //This should be their user photo
    course_photo: require ('../assets/images/avatar.png'),
    //Budget and monthly cap could maybe 
    likes: 1000,
    amount_excersizes: 5000,
    price: true,
    //This could be when the new semester comes, what courses and their ratings there
    hours_of_video:false,

};

const lecture= {
    id: '',
    courseId:'',
    name: '',
    description:'',
    //Location could be their university
    lenght: '',
    //This should be their student email
    links: [],
    //This should be their user photo
    lecture_photo: require ('../assets/images/avatar.png'),
    //Budget and monthly cap could maybe 
    price_for_video:'',
    rating:'',
    excersize:'',
};

export {
    categories,
    explore, 
    products,
    profile,
    courses,
    lecture
}