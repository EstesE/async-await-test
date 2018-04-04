import Route from '@ember/routing/route';
import fetch from 'fetch';
import { inject as service } from '@ember/service';

export default Route.extend({
    notifications: service('toast'),

    randomPost: function(posts) {
        let length = posts.length;
        return posts[Math.floor(Math.random() * length)];
    },

    async model() {
        try {
            const posts = await fetch(`http://localhost:3000/posts?_delay=2000`).then(response =>{
                return response.json();
            });

            const post = await this.randomPost(posts);

            const comments = await fetch(`http://localhost:3000/posts/${post.id}/comments?_delay=1000`).then(response => {
                return response.json();
            });

            return {
                posts,
                post,
                comments
            };
            
        } catch (err) {
            let notifications = this.get('notifications');
            notifications.error(err.message, '', { progressBar: false });
        }
    }
});
