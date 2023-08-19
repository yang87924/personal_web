import {createRouter, createWebHistory} from 'vue-router';
const routes =[
    {
        path:'/',
        redirect:'/wall',
        name:'index',
        component:()=>import('../views/YangMessageBoard.vue'),
        children:[
            {
                path:'wall',
                component:()=>import('../views/WallMessage.vue')
            }
        ]
    }
    
]
const router =createRouter({
    history: createWebHistory(),
    routes,
})
export default router