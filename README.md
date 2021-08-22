<a  href="https://gatsbygroovyanalytics.gatsbyjs.io/" target="_blank">
<img src="https://gatsbygroovyanalytics.gatsbyjs.io/images/gatsby-groovy-google-analytics-og-image.jpg" alt="Groovy Analytics" />
</a>

# Gatsby FuncJam '21

Groovy Analytics is both a classic Gatsby static site requesting location data from the Google Analytics API at build time using `gatsby-node` AND a dynamic application that uses Gatsby Functions to `post` and `get` data from a Fauna database, has user authentication provided by Auth0 and lastly has a simple `post` to ConvertKit to capture users email addresses for (Queen Raae's) Gatsby Newsletter.

**See the demo site here:** [🕺 Groovy Analytics](https://gatsbygroovyanalytics.gatsbyjs.io/)

<br />

## ⚙️ The Functions

There are two types of functions in this site: `public` and `private`. All `GET` requests are public, but one `POST` request is private.

<br />

### 🧑‍🤝‍🧑 Public Functions

These can be hit from the browser address bar and will return a `JSON` object.

<br />

#### **`GET`** | /api/get-all-reactions

🔗 [https://gatsbygroovyanalytics.gatsbyjs.io/api/get-all-reactions](https://gatsbygroovyanalytics.gatsbyjs.io/api/get-all-reactions)

The `src` can be found here: [/src/api/get-all-reactions.ts](/src/api/get-all-reactions.ts)

##### Example axios `GET` request

```javascript
const getAllReactions = async () => {
  try {
    const response = await axios('/api/get-all-reactions')
    console.log(response.data.reactions)
  } catch (error) {
    console.warn(error.message)
  }
}
```

<br />

#### **`GET`** | /api/get-all-comments

🔗 [https://gatsbygroovyanalytics.gatsbyjs.io/api/get-all-comments](https://gatsbygroovyanalytics.gatsbyjs.io/api/get-all-comments)

The `src` can be found here: [/src/api/get-all-comments.ts](/src/api/get-all-comments.ts)

<br />

#### **`POST`** | /api/signup-newsletter

##### `req.body` params

| Name  | Type   | Required | Summary                 |
| ----- | ------ | -------- | ----------------------- |
| email | string | true     | The users email address |

🔗 [https://gatsbygroovyanalytics.gatsbyjs.io/api/signup-newsletter](https://gatsbygroovyanalytics.gatsbyjs.io/api/signup-newsletter)

The `src` can be found here: [/src/api/signup-newsletter.ts](/src/api/signup-newsletter.ts)

##### Example axios `POST` request with `req.body.email`

```javascript
const handleSubmit = async (email) => {
  try {
    const response = await axios.post('/api/signup-newsletter', {
      email: email,
    })
    console.log(response.data.message)
  } catch (error) {
    console.warn(error.message)
  }
}
```

<br />

#### **`POST`** | /api/add-reaction

##### `req.body` params

| Name     | Type   | Required | Summary                             |
| -------- | ------ | -------- | ----------------------------------- |
| reaction | string | true     | The Reaction type                   |
| date     | date   | true     | The Date the reaction was submitted |

🔗 [https://gatsbygroovyanalytics.gatsbyjs.io/api/add-reaction](https://gatsbygroovyanalytics.gatsbyjs.io/api/add-reaction)

The `src` can be found here: [/src/api/add-reaction.ts](/src/api/add-reaction.ts)

<br />

### 🔐 Private Functions

Private functions require Twitter login and a `Bearer token` provided by Auth0

<br />

#### **`POST`** | /api/add-comment

##### `req.body` params

| Name    | Type   | Required | Summary                            |
| ------- | ------ | -------- | ---------------------------------- |
| user    | string | true     | The users name                     |
| comment | string | true     | The users comment                  |
| date    | date   | true     | The Date the comment was submitted |

##### `req.headers` params

| Name          | Type   | Required | Summary                |
| ------------- | ------ | -------- | ---------------------- |
| Authorization | string | true     | The Auth0 access token |

🔗 [https://gatsbygroovyanalytics.gatsbyjs.io/api/add-comment](https://gatsbygroovyanalytics.gatsbyjs.io/api/add-comment)

The `src` can be found here: [/src/api/add-comment.ts](/src/api/add-comment.ts)

##### Example axios `POST` request with `req.headers`

```javascript
const handleSubmit = async (user, comment) => {
  try {
    const response = await axios.post(
      '/api/add-comment',
      {
        user: user.name,
        comment: comment,
        date: new Date(),
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    console.log(response.data.message)
  } catch (error) {
    console.warn(error.message)
  }
}
```
