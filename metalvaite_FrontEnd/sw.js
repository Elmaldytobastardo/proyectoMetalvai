console.log('holaaaaaaaaa')
self.addEventListener('push', e=>{
    const data = e.data.json()
    self.registration.showNotification(data.tittle,
        {body: data.message}
    )
})