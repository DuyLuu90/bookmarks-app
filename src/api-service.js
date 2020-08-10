import config from './config'

export const BookmarkApiServices={
    getAllItems(){
        return fetch(config.API_ENDPOINT,{
            headers:{
                'authorization': `bearer ${config.API_KEY}`
            }
        })
        .then(res => (!res.ok)
              ? res.json().then(e =>Promise.reject(e))
              : res.json())
    },
    postItem(bookmark){
        return fetch(config.API_ENDPOINT, {
            method: 'POST',
            headers: {
              'authorization': `bearer ${config.API_KEY}`,
              'content-type': 'application/json',
            },
            body: JSON.stringify(bookmark),
          })
            .then(res=>(res.ok)
                ? res.json()
                : res.json().then(e =>Promise.reject(e))
            )
    },
    getItemById(id){
        return fetch(`${config.API_ENDPOINT}/${id}`,{
            headers:{
                'authorization': `bearer ${config.API_KEY}`
            }
        })
        .then(res => (!res.ok)
              ? res.json().then(e =>Promise.reject(e))
              : res.json()
            )
    },
    patchItemById(id, fieldsToUpdate){
        return fetch(`${config.API_ENDPOINT}/${id}`,{
            method:`PATCH`,
            headers:{
                'authorization': `bearer ${config.API_KEY}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(fieldsToUpdate)
        })
        .then(res => (!res.ok)
              ? res.json().then(e =>Promise.reject(e))
              : res.json()
            )
    },
    deleteItemById(id){
        return fetch(`${config.API_ENDPOINT}/${id}`,{
            method: 'DELETE',
            headers:{
                'authorization': `bearer ${config.API_KEY}`
            }
        })
        .then(res => (!res.ok)
              ? res.json().then(e =>Promise.reject(e))
              : res.json()
            )

    }
}