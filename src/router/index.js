import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home";
import SelectCompany from "../pages/SelectCompany";
import SelectProject from "../pages/SelectProject";
import ProjectDashboard from "../pages/ProjectDashboard";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Root',
        component: Home
    },
    {
        path: '/companySelect',
        name: 'SelectCompany',
        component: SelectCompany
    },
    {
        path: '/projects/:companyId',
        name: 'SelectProject',
        component: SelectProject
    },
    {
        path: '/dashboard/:projectId',
        name: 'ProjectDashboard',
        component: ProjectDashboard
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router