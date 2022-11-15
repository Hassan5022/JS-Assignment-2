class Spotify {
    constructor() {
        this.CLIENT_ID = '94d397db951549bbae0e8996e31aafc3';
        this.CLIENT_SECRET = '58037c60e9cd4e30b35cbd0eb09d49e9';
    }

    async getToken() {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            body: 'grant_type=client_credentials',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + btoa(this.CLIENT_ID + ':' + this.CLIENT_SECRET),
            },
        });
        const responseData = await response.json();
        localStorage.setItem('token', responseData.access_token);
    }

    async getSong(query) {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=20`, {
            method: 'GET',
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        });
        if(response.status != 401){
            var responseData = await response.json();
            return responseData;
        }else{
            this.getToken();
            const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=5`, {
                    method: 'GET',
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
                });
                var responseData = await response.json();
                return responseData;
        }
    }
}