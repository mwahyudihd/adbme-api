import fastify from "fastify";
import fastifyMongodb from "@fastify/mongodb";

const app = fastify();

app.get('*', async (req, res) => {
    return {
        status: 404,
        message: "Not Found"
    }
})

app.register(fastifyMongodb, {
    forceClose: true,
    url: 'mongodb+srv://wawprjct:JeRaqTHEwN1SJphQ@cluster0.ipwne8d.mongodb.net/db_adobme?retryWrites=true&w=majority&appName=Cluster0'
});

app.get('/user/:_id', async function (req, res) {
    const users = this.mongo.db.collection('user');
    const id = req.params._id;
  try {
    const user = await users.findOne({ _id: id });
    if (!user) {
        res.status(404).send(
            {
                statusCode: 404,
                message: "Ops! Data is not Found"
            }
        );
    }
    return {
        statusCode: 200,
        message: "Request success",
        data: user
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(
        {
            statusCode: 500,
            message: "Internal server is Error"
        }
    );
  }
});

app.listen({ port: 3000 }, (err, address) => {
    if(err){
        console.log(err);
        process.exit(1);
    }
    console.log(`Server is listening at ${address}`);
});