/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Go code!
*/
const express = require("express");
const Projects = require("./data/helpers/projectModel.js");
const actionRouter = require("./actions");
const server = express();

const port = process.env.PORT||9999;

server.listen(port, () => console.log(`\n == API on port ${port} == \n`));

server.use(express.json());

server.use("/api/actions", actionRouter);

function FindProjectId(req, res, next) {
  if (req.params.id) {
    req.project = req.params.id;
    next();
  } else {
    res.status(400).json({ message: "FindProjectId does not work" });
  }
}
function FindProject(req, res, next) {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: "FindProject does not work" });
  } else {
    next();
  }
}

server.get("/", (req, res) => {
  res.json({ api: "up and running" });
  res.send("server is returning data");
});

server.get("/api/projects", (req, res) => {
    Projects.get()
    .then((Projects) => {
      res.status(200).json(Projects);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "will not get progects" });
    });
});
server.get('/api/projects/:id/actions', (req, res) => {
    const {id} = req.params;

    Projects.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'will not get actions'})
        })
})

server.get("/api/projects/:id", FindProjectId, (req, res) => {
  Projects.get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "will not get progect by id" });
    });
});

server.post("/api/projects", FindProject, (req, res) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "will not post new progects to /progects" });
    });
});

server.put("/api/projects/:id", FindProject,  FindProjectId, (req, res) => {
    Projects.update(req.params.id, req.body)
      .then((project) => {
        res.status(200).json(project);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "will not edit progect by id" });
      });
  }
);

server.delete("/api/projects/:id", FindProjectId, (req, res) => {
  Projects.remove(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "will not edit progects by id" });
    });
});
