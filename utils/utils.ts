export function logWithoutImage(label: string, queryResult: any) {
    if(Array.isArray(queryResult)){
        const logWithoutImage = queryResult.map((result) => ({
            ...result,
            img: result.img ? result.img.slice(0,15) : null
        }));
        return console.log(label ,logWithoutImage)
    }
}

export function formatTime(seconds: number): string {
    if (seconds < 0) {
      throw new Error("Seconds cannot be negative");
    }
    if(seconds > 60){
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
      
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds.toString();
        return `${formattedMinutes}:${formattedSeconds} minutes`;
    }
  return `${seconds} seconds`
  }