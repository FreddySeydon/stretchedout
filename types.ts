// export type Exercise = [{
//     id: number,
//     name: string,
//     description: string,
//     duration: number,
//     img: string,
//     sidechange?: 0 | 1
//   }]

export type Exercise = {
    id: number,
    name: string,
    description: string,
    duration: number,
    img: string,
    sidechange?: 0 | 1
  }

export type QueryResult<T> = {
    rows: T
  } | null;


// export type Programs = [{
//     id: number,
//     name: string,
//     description: string,
//     duration: number,
//     img: string
//   }]

// export type OneProgramInfo = [{
//     id: number,
//     name: string,
//     description: string,
//     duration?: number,
//     img: string
//   }]

export type ProgramInfo = {
    id: number,
    name: string,
    description: string,
    duration?: number,
    img: string
  }