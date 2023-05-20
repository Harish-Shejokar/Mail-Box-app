

export const removeBlueDots = () => {
    return async () => {
        const updateWindowProperty = async() => {
            try {
                const response = await fetch(
                    `https://mailbox-e593a-default-rtdb.firebaseio.com/SentEmail.json`,
                    {
                        method: "PUT",
                        body: JSON.stringify({
                            
                        }),
                        headers: {
                            "Content-Type":"application/json",
                        }
                    }
                );
            } catch (error) {
                console.log(error);
            }
        }
    }
}