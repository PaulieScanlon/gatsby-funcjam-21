<a  href="https://gatsbygroovyanalytics.gatsbyjs.io/" target="_blank">
<img src="https://gatsbygroovyanalytics.gatsbyjs.io/images/gatsby-groovy-google-analytics-og-image.jpg" alt="Groovy Analytics" />
</a>

# Gatsby FuncJam '21

Groovy Analytics is both a classic Gatsby static site requesting location data from the Google Analytics API at build time using `gatsby-node` AND a dynamic application that uses Gatsby Functions to `GET` and `POST` the following:

- Get all Reactions stored in Fauna Database
- Get all Comments stored in Fauna Database
- Post a Reaction to Fauna Database
- Post a Comment to Fauna Data (with server-side Authentication)
- Post to Convertkit for Newsletter signups

## 👀 Live Demo

🕺 Groovy Analytics: [https://gatsbygroovyanalytics.gatsbyjs.io](https://gatsbygroovyanalytics.gatsbyjs.io/)

<br />

## ⚙️ The Functions

There are two types of functions in this site: `public` and `private`. All `GET` requests are public, but one `POST` request is private.

<br />

## 🧑‍🤝‍🧑 Public Functions

These can be hit from the browser address bar and will return a `JSON` object.

<br />

### 😲 Get all reactions

#### **`GET`** | [/api/get-all-reactions](https://gatsbygroovyanalytics.gatsbyjs.io/api/get-all-reactions)

`src`: [/src/api/get-all-reactions.ts](/src/api/get-all-reactions.ts)

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

### 💬 Get all comments

#### **`GET`** | [/api/get-all-comments](https://gatsbygroovyanalytics.gatsbyjs.io/api/get-all-comments)

`src`: [/src/api/get-all-comments.ts](/src/api/get-all-comments.ts)

##### Example axios `GET` request

```javascript
const getAllComments = async () => {
  try {
    const response = await axios('/api/get-all-comments')
    console.log(response.data.reactions)
  } catch (error) {
    console.warn(error.message)
  }
}
```

<br />

### 📥 Signup to Newsletter

#### **`POST`** |[/api/signup-newsletter](https://gatsbygroovyanalytics.gatsbyjs.io/api/signup-newsletter)

##### `req.body` params

| Name  | Type   | Required | Summary                 |
| ----- | ------ | -------- | ----------------------- |
| email | string | true     | The users email address |

`src`: [/src/api/signup-newsletter.ts](/src/api/signup-newsletter.ts)

##### Example axios `POST` request with `req.body`

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

### 🏖️ Summer Functions

We covered Newsletters on Week 1 of [#GatsbySummerFunctions](https://twitter.com/hashtag/gatsbysummerfunctions)

[🔴 Collect email addresses (and more) from visitors · #GatsbySummerFunctions · Week 1](https://youtu.be/TWLY4VEPw6E)

![Week 1](https://i.ytimg.com/vi/TWLY4VEPw6E/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDfr__qy39o_Oixl1aehq0Q2cW5_g)

<br />

### 😲 Submit a reaction

#### **`POST`** | [/api/add-reaction](https://gatsbygroovyanalytics.gatsbyjs.io/api/add-reaction)

##### `req.body` params

| Name     | Type   | Required | Summary                             |
| -------- | ------ | -------- | ----------------------------------- |
| reaction | string | true     | The Reaction type                   |
| date     | date   | true     | The Date the reaction was submitted |

`src`: [/src/api/add-reaction.ts](/src/api/add-reaction.ts)

##### Example axios `POST` request with `req.body`

```javascript
const handleSubmit = async (reaction) => {
  setIsSubmitting(true)
  try {
    await axios.post('/api/add-reaction', {
      reaction: reaction,
      date: new Date(),
    })
    console.log(respose.data.message)
  } catch (error) {
    console.warn(error.message)
  }
}
```

### 🏖️ Summer Functions

We covered Reactions on Week 2 of [#GatsbySummerFunctions](https://twitter.com/hashtag/gatsbysummerfunctions)

[🔴 Gather reactions (claps, hearts or votes) from visitors · #GatsbySummerFunctions · Week 2](https://youtu.be/xDpvE1c_gmo)

![Week 2](https://i.ytimg.com/vi/xDpvE1c_gmo/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBd4ipVzqBEhg-hWxNVT3tAdtdELA)

<br />

## 🔐 Private Functions

Private functions require Twitter login and a `Bearer token` provided by Auth0

<br />

### 💬 Submit a comment

#### **`POST`** | [/api/add-comment](https://gatsbygroovyanalytics.gatsbyjs.io/api/add-comment)

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

`src`: [/src/api/add-comment.ts](/src/api/add-comment.ts)

##### Example axios `POST` request with `req.body` / `req.headers`

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

### 🏖️ Summer Functions

We covered Auth0 Authentication on Week 3 of [#GatsbySummerFunctions](https://twitter.com/hashtag/gatsbysummerfunctions)

[🔴 Limit usage to visitors who have logged in with Auth0 · #GatsbySummerFunctions · Week 3](https://youtu.be/9wGUZa2AWSU)

![Week 3](https://i.ytimg.com/vi/9wGUZa2AWSU/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDa1dFBZ8cXbOLKSnr7dMnvGoZROg)

We covered Comments on Week 4 of [#GatsbySummerFunctions](https://twitter.com/hashtag/gatsbysummerfunctions)

[🔴 Poll and display live data on your site · #GatsbySummerFunctions · Week 4](https://youtu.be/VoKiISuvvKQ)

![Week 4](https://i.ytimg.com/vi/C-Ct9QmN6tM/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBfM0Uw7XPYIPyMI1XUIoU92_uv9A)
