export async function getPrice(id: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(id * 1000)
    }, 1000)
  })
}
