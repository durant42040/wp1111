# Web Programming HW#9
網址: https://hw9-deploy.netlify.app/
功能同 hw7/8

由於TA的tutorial似乎不適用用graphql的app，所以我用railway deploy backend,然後用netlify deploy frontend，前者方式跟tutorial的相同，除了serve frontend的部分。後者則是將frontend
build好的build資料夾，直接drag到netlify的sites裡頭。

但是subscription的功能會被chrome因資安問題block掉，所以要到左上角的鎖的圖案，點選site setting，然後allow insecure contents.
應該就可以看到subscription了。

我相信一定有更好的方法deploy這類app的，如果知道還煩請指教，謝謝。
