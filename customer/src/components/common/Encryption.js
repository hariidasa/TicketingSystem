export function getHash(pwd){
    let hash=0;
    for (let i=0;i<pwd.length;i++){
        hash+=Math.pow(pwd.charCodeAt(i)*31,pwd.length-i);
        hash=hash & hash
    }
    return hash
};