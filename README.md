# Guide
## when the weather change to rain, that will notify you.

### install

```bash
npm install
```

### configure
it needs define below content in env.js.
```javascript
const env = {
        account: {
            host: '',
            port: 465,
            secure: true,
            auth: {
                user: '', 
                pass: ''
            }
        },
        to: ''
}
module.exports = env;
```

### start

```bash
npm run start
```
