var n = 0
function x(a) {
    n += 1
    const element = document.getElementById(a);
    element.remove();
    if (n===5){
    document.getElementById("main").style.width='100%'
        document.getElementById("main").style.height='90%'
    document.getElementById("curry").style.left='470px'
    document.getElementById("anchor").style.left='600px'
    document.getElementById("guest").style.display='none'
}
}

var a = ["me", "guest1", "guest2", "guest3", "guest4", "guest5"]
const e = ["me", "guest1", "guest2", "guest3", "guest4", "guest5"]
var b = ["curry", "cena", "pine", "jesus", "wok", "chad"]
const f = ["curry", "cena", "pine", "jesus", "wok", "chad"]
var k = 0;
var ex = 0;
function swap(i) {
    if (i !== k) {
        if(ex === 1){
        document.getElementById("guest").style.width='33%'
        document.getElementById("main").style.width='66%'
        ex = 0;
        guest = document.getElementsByClassName("guest")
        me = document.getElementsByClassName("me")
            guest[0].style.width='46%'
            guest[0].style.height='20%'
            guest[1].style.width='46%'
            guest[1].style.height='20%'
            guest[2].style.width='46%'
            guest[2].style.height='20%'
            guest[3].style.width='46%'
            guest[3].style.height='20%'
            guest[4].style.width='46%'
            guest[4].style.height='20%'
            guest[5].style.width='45%'
            guest[5].style.height='20%'
            guest[i-1].className = "me"
            me[0].style.width='100%'
            me[0].style.height='100%'
        }

        let element1 = document.getElementById("main")
        let element2 = document.getElementById("guest")
        let newnode = document.getElementById(e[i])
        let oldnode = document.getElementById(a[0])
        let c = a[0]
        a[0] = e[i]
        a[i] = c
        k = i
        element1.appendChild(newnode)
        element2.appendChild(oldnode)
        oldnode.className = "guest"
        newnode.className = "me"
        document.getElementById(b[0]).className = "prof"
        document.getElementById(f[i]).className = "mprof"

        anchor = document.getElementById("anchor")
        anchor.style.bottom = '30px'
        oldnode.children[3].style.top = '-50px'
        oldnode.children[3].style.left = '70px'
        oldnode.children[2].style.top = '30px'
        oldnode.children[2].style.left = '60px'
        oldnode.children[4].style.top = '-40px'
        oldnode.children[4].style.right = '90px'
        if (i !== 0){
        newnode.children[3].style.top = '190px'
        newnode.children[3].style.left = '400px'
        newnode.children[2].style.top = '300px' /* 2 anchor 3 profile 4 name*/
        newnode.children[2].style.left = '425px'
        newnode.children[4].style.top = '400px'
        newnode.children[4].style.right = '140px'

    }
        else {
        newnode.children[3].style.top = '250px'
        newnode.children[3].style.left = '290px'
        newnode.children[2].style.top = '200px' /* 2 anchor 3 profile 4 name*/
        newnode.children[2].style.left = '425px'
        newnode.children[4].style.top = '400px'
        newnode.children[4].style.right = '140px'
    }
        if (a[i] === "me") {
            document.getElementById("curry").style.top = '-15px'
            document.getElementById("curry").style.left = '50px'
            document.getElementById("anchor").style.top = '50px'
            document.getElementById("anchor").style.left = '50px'
        }

        let d = b[0];
        b[0] = f[i];
        b[i] = d;

    }
    else {
        if (ex === 0) {
            ex = 1
            document.getElementById("guest").style.width = '100%'
            document.getElementById("main").style.width = '0%'
            let element2 = document.getElementById("guest")
            let newnode = document.getElementById(e[i])
            element2.appendChild(newnode)
            newnode.className = "guest"
            document.getElementById(b[0]).className = "prof"
            guest = document.getElementsByClassName("guest")
            for (var j = 0; j < guest.length; j++) {
                guest[j].style.width = '30%'
                guest[j].style.height = '45%'
            }
            if (i !== 0){
                document.getElementById(f[i]).style.top = '-200px'
                document.getElementById(f[i]).style.left = '-200px'
            }

            if (i !== 0) {
                newnode.children[3].style.top = '190px'
                newnode.children[3].style.left = '400px'
                newnode.children[2].style.top = '300px' /* 2 anchor 3 profile 4 name*/
                newnode.children[2].style.left = '425px'
                newnode.children[4].style.top = '400px'
                newnode.children[4].style.right = '140px'

            } else {
                newnode.children[3].style.top = '250px'
                newnode.children[3].style.left = '290px'
                newnode.children[2].style.top = '200px' /* 2 anchor 3 profile 4 name*/
                newnode.children[2].style.left = '425px'
                newnode.children[4].style.top = '400px'
                newnode.children[4].style.right = '140px'
            }
            if (a[i] === "me") {
                document.getElementById("curry").style.top = '15px'
                document.getElementById("curry").style.left = '-50px'
                document.getElementById("anchor").style.top = '-20px'
                document.getElementById("anchor").style.left = '50px'
            }

        }
        else {
            document.getElementById("guest").style.width='33%'
        document.getElementById("main").style.width='66%'
        ex = 0;
        guest = document.getElementsByClassName("guest")

            guest[0].style.width='45%'
            guest[0].style.height='20%'
            guest[1].style.width='45%'
            guest[1].style.height='20%'
            guest[2].style.width='45%'
            guest[2].style.height='20%'
            guest[3].style.width='45%'
            guest[3].style.height='20%'
            guest[4].style.width='45%'
            guest[4].style.height='20%'
            guest[5].style.width='45%'
            guest[5].style.height='20%'

            let element1 = document.getElementById("main")
        let element2 = document.getElementById("guest")
        let newnode = document.getElementById(e[i])
        let c = a[0]
        a[0] = e[i]
        a[i] = c
        k = i
        element1.appendChild(newnode)
        document.getElementById(b[0]).className = "prof"
        document.getElementById(f[i]).className = "mprof"

        anchor = document.getElementById("anchor")
        anchor.style.bottom = '30px'
        if (i !== 0){
        newnode.children[3].style.top = '190px'
        newnode.children[3].style.left = '400px'
        newnode.children[2].style.top = '300px' /* 2 anchor 3 profile 4 name*/
        newnode.children[2].style.left = '425px'
        newnode.children[4].style.top = '400px'
        newnode.children[4].style.right = '140px'

    }
        else {
        newnode.children[3].style.top = '250px'
        newnode.children[3].style.left = '290px'
        newnode.children[2].style.top = '200px' /* 2 anchor 3 profile 4 name*/
        newnode.children[2].style.left = '425px'
        newnode.children[4].style.top = '400px'
        newnode.children[4].style.right = '140px'
    }
        if (a[i] == "me") {
            document.getElementById("curry").style.top = '200px'
            document.getElementById("curry").style.left = '250px'
            document.getElementById("anchor").style.top = '130px'
            document.getElementById("anchor").style.left = '380px'
        }
        newnode.className = "me"
        document.getElementById(e[i]).style.width = '100%'
        document.getElementById(e[i]).style.height = '100%'
        me = document.getElementsByClassName("me")
        me[0].style.width='100%'
        me[0].style.height='100%'
        let d = b[0];
        b[0] = f[i];
        b[i] = d;

        }
    }
}