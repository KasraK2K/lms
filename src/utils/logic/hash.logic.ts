export const hashGenerator = async (text: string) => await Bun.password.hash(text)

export const validateHash = async (text: string, hash: string) => await Bun.password.verify(text, hash)
