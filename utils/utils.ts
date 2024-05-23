export function logWithoutImage(label: string, queryResult: any) {
    if(Array.isArray(queryResult)){
        const logWithoutImage = queryResult.map((result) => ({
            ...result,
            img: result.img ? result.img.slice(0,15) : null
        }));
        return console.log(label ,logWithoutImage)
    }
}