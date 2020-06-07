const express = require("express");

const Actions = require("./data/helpers/actionModel");

const router = express.Router();

router.use(express.json());

function FindAction(req, res, next) {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res
      .status(400)
      .json({ message: `did not Provide project id, description or notes` });
  } else if (req.body.description.length > 128) {
    res
      .status(400)
      .json({ message: "you reached the limit 128 inside discreption" });
  } else {
    next();
  }
}

function FindActionId(req, res, next) {
  if (req.params.id) {
    next();
  } else {
    res.status(400).json({ message: " cant read id" });
  }
}

router.get("/", (req, res) => {
  Actions.get()
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "will not get actions" });
    });
});

router.get("/:id", FindActionId, (req, res) => {
  Actions.get(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "will not get acions by id" });
    });
});

router.post("/", FindAction, (req, res) => {
  Actions.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "will not add a new acion to /actions" });
    });
});

router.put("/:id", FindAction, FindActionId, (req, res) => {
  Actions.update(req.params.id, req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "will not edit by id" });
    });
});

router.delete("/:id", FindActionId, (req, res) => {
  Actions.remove(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "will not edit by id" });
    });
});

module.exports = router;
