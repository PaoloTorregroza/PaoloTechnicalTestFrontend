import axios from 'axios'

export async function checkToken(instance) {
    const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
    }

    try {
        if (instance.$store.state.userData.id) {
            return await axios.get(`${instance.$apiUrl}/user/${instance.$store.state.userData.id}`,
                config
            )
        } else {
            if (instance.$route.path !== '/')
                await instance.$router.push('/')
        }
    } catch (e) {
        localStorage.clear()
        instance.$store.commit("logout")
        if (instance.$route.path !== '/')
            await instance.$router.push("/")
    }
}