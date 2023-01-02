# Web Programming Final Project README -- 第80組  NBA.js
### 組員： 電機一  項達均
Website: https://finalprojectnba.netlify.app/

Demo:
## Setup
1. under `final`, run the following command:
```bash
yarn
yarn install:all
```
2. place `.env`, `.env.defaults`, and `.babelrc` Under `final/backend`.
3. Under `final`, execute the command below to start backend server at port 4000:
```bash
yarn server
```
4. Under `final`, execute the command below:
```bash
yarn start
```
The app should be up and running at `localhost:3000`.
## Introduction
此次專題的主題為一簡單的NBA網站，有兩個主要功能，一是能看到即時的比賽分數和球員數據，二是能閱讀籃球相關文章。進入後應該會看到：
![](https://i.imgur.com/75Y3yUz.jpg)
* 左邊是新聞欄，點擊任一個card應會進入文章：
![](https://i.imgur.com/xJcWFcI.jpg)

可以看到作者資訊、最近編輯日期、文章內容、和其他文章(Read More)，點擊的話會redirect到該文章。
* 回到Home，右邊可以看到當日的比數，會有live updates，但api大概每十分鐘才會更新一次，所以有跟沒有差不多(抱歉，免費的api比較遜)，若還沒開始則會顯示開始時間，進行中的話會看到在第幾節，若結束則會顯示final，並且下面會多出highlights按鈕，點擊的話會redirect到Youtube搜尋highlights。
* 上面可以切換日期，default會在今日，切換後會顯示那天的比賽資訊。
(**要小心日期不要換太快，因為api有限制拿資料的頻率。**)
* 點擊任一比賽的Box Score按鈕，會redirect到：
![](https://i.imgur.com/aFcTn6h.png)
可以看到Celtics輸了，爽。也可以看到的是每位上場球員的得分、籃板、助攻等等。上面的Navigation Bar點擊Team Stats，會看到(也可從主頁進入)：
![](https://i.imgur.com/tBtVvPQ.png)
* 點擊更上方的ScoreBoard，會redirect到`/scores`:
![](https://i.imgur.com/wmnYxHy.png)
除了比數外，還會顯示各隊得分最多的球員。其他功能同Home的scoreboard。
* 在app的右上角，會看到Log In的按鈕，點擊後會redirect到LogIn page，請輸入以下帳密(不提供註冊)：
    *  **Account: b11901040@ntu.edu.tw**
    *  **Password: 9g8QXWpKS6L@2Pf**
* 登入後Login鈕會被用戶名字、頭貼、add button、跟Log Out取代。點擊add button，會出現:
  ![](https://i.imgur.com/xmzYArJ.png)
* title, desciption,和內容為必填，若違反會出現：
![](https://i.imgur.com/Njwex6G.png)
* imageURL要你paste圖片的網址，Headline會決定此文章是否為頭條。(**注意一次只能有一個頭條，所以在publish之前要把上一個頭條刪掉**)
* 下面有兩個按鈕，cancel會關掉modal，並重設所有資料。如按publish，新聞欄則會出現你剛寫的文章。
進入文章頁面，會發現多了編輯跟刪除的按鈕，點了編輯後，會出現：
![](https://i.imgur.com/qHaEXIW.png)
* 除了所有資料外，Write an Article變成Edit Article。編輯的所有資料都會即時更新。
## 使用技術/第三方套件
* **Frontend**: Material UI, Apollo Client, Auth0, Axios, Dompurify, Reactquill, React-router-dom
* **Backend**: Graphql, uuidv4, nodemon, babel, dotenv-defaults
* **Database**: MongoDB
## Code
The file structure is as follows:
```
├── backend
│   ├── package.json
│   ├── src
│   │   ├── db.js
│   │   ├── index.js
│   │   ├── models
│   │   │   └── article.js
│   │   ├── mongo.js
│   │   ├── resolvers
│   │   │   ├── Mutation.js
│   │   │   └── Query.js
│   │   ├── schema.graphql
│   │   └── server.js
│   └── yarn.lock
├── frontend
│   ├── README.md
│   ├── package.json
│   ├── public
│   ├── src
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── components
│   │   │   ├── BoxScore.js
│   │   │   ├── BoxScoreRow.js
│   │   │   ├── Datepicker.js
│   │   │   ├── Editor.js
│   │   │   ├── Headline.js
│   │   │   ├── NavBar.css
│   │   │   ├── NavBar.js
│   │   │   ├── NavBar2.css
│   │   │   ├── NavBar2.js
│   │   │   ├── NewsPage.js
│   │   │   ├── ScoreCard.css
│   │   │   ├── ScoreCard.js
│   │   │   ├── ScoreCard2.css
│   │   │   ├── ScoreCard2.js
│   │   │   ├── ScoreCard3.js
│   │   │   ├── Story.js
│   │   │   └── TeamStats.js
│   │   ├── containers
│   │   │   ├── Article.js
│   │   │   ├── Game.css
│   │   │   ├── Game.js
│   │   │   ├── Homepage.css
│   │   │   ├── Homepage.js
│   │   │   ├── Login.js
│   │   │   ├── ScoreBoard.css
│   │   │   └── ScoreBoard.js
│   │   ├── graphql
│   │   │   ├── index.js
│   │   │   ├── mutations.js
│   │   │   └── queries.js
│   │   ├── hooks
│   │   │   └── useData.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── package.json
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   └── yarn.lock
├── package.json
├── README.md
└── yarn.lock
```
All NBA data is fetched using `axios` from https://www.balldontlie.io/api/v1.

The homepage `Homepage.js` consists of `Newspage.js` and `scoreCard.js`. The article page is created by `Article.js`,
the game page from `Game.js`, which contains `ScoreCard3.js`, `BoxScore.js`, or `TeamStats.js`. In the news section, there is either the 
headline(`headline.js`) or a story(`story.js`).The Article editor is `Editor.js`, which uses `Reactquill` to generate HTML code for the content
of the article. 
```javascript
<ReactQuill theme='snow' value={content} onChange={setContent}/>
```
The HTML code is used in `Article.js` using `DOMPurify`:
``` javascript
// in Article.js
<Box sx={{margin:'20px 40px', fontSize:'18px'}} 
     dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(data?.getArticle.content),}}></Box>
```
multiple Material UI components, such as `Box`, `Typography`, `Button`, `Container`, etc. are used throughout the project. A loading icon is used in various parts of the app 
for better user experience.

React `useContext` is also used in `useData.js` for states and function to be accessed by different components.
```javascript
const useData = () => useContext(ChatContext); // in useData.js
```
User authentication is implemented using `Auth0`, but registering an account is not allowed for obvious reasons.
```javascript
const {loginWithRedirect, logout, isAuthenticated, user} = useAuth0();
```

The backend uses graphql as its data query and mutation language, methods include: `getArticle` used in the article page `Article.js`, `getArticles` used in the news section
`Newspage.js`, `DeleteArticle` used to delete an article, and `CreateArticle` used in `Editor.js` for the publishing of an article. The data(Articles) is stored in MongoDB. 
Upon starting the server and establishing connection with mongoDB, the database is cleared and data from `db.js` is saved in the database. A new id is created using `uuidv4` for every article.
## Deployment
* The frontend is deployed using Netlify: https://finalprojectnba.netlify.app/
* The server is deployed on Railway: https://finalprojectbackend-production-77b8.up.railway.app/
* Data from the server is stored in a Mongo database from Railway.
## 心得
這次專題有好幾次跟人組隊的機會，最後都沒有成功。我想主要是因為同屆修課人數不多(好像只有我)和自己實力不佳的緣故，有些可惜。畢竟自己GitHub不是很熟，也沒有過跟人合作寫程式的經驗。這也導致我每天寫到快暴斃。不過好處是這樣專題內容可以隨我所好，說不定分數比較高。

這次寫雖然花了兩個多禮拜，但過程意外的順利，很多想做的功能都有成功做出來，也沒有遇到很多嚴重的bug。我想這是暗示我自己有在進步吧。花最久的應該是處理data fetching產生的非同步問題吧，不得不說react在這邊實在在找人麻煩。後端設定graphql也相當順利，反而大部分時間都在調整CSS。過程中也秉持同一行程式碼不出現兩次的精神，雖然難免有破例啦。

另外，由於用的是免費api，很多較詳細的數據都拿不到，導致有些功能做不出來，有點可惜。

我記得，某教授好像有講過一句話，”you’ve never learned a language until you have built something you thought you couldn’t.”。我想這是一個很好的例子。不過，web development的領域之大，有好多想學的東西，希望未來幾年能好好學習，搞不好等自己強一點後再來修課或當TA也蠻有趣的。

最後想感謝黃鐘揚教授跟TA們花這麼多時間來教課，雖然每次黑客松都被電爛，作業debug到爆氣，但還是獲益良多，學到很多東西。
