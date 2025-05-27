import User from "../models/User.js"

class UserDAO {
  constructor() {
    this.model = User
  }

  create = async (req, res) => {
    try {
      const document = new this.model(req.body)

      await document.save()

      const data = await this.model.findOne({email:document.email})

      res.status(201).json(data)
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error creating document: ${error.message}` })
    }
  }

  getAll = async (req, res) => {
    try {
      const items = await this.model.find()
      res.status(200).json(items)
    } catch (error) {
      res.status(500).json({ message: `Error fetching documents: ${error}` })
    }
  }

  getById = async (req, res) => {
    try {
      const item = await this.model.findById(req.params.id)
      if (!item) {
        res.status(404).json({ message: "user not found" })
        return;
      }

      res.status(200).json(item)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  getByEmail=async (req,res)=>{
    try {
      
     const {email}=req.query
      // console.log(email)
      const item=await this.model.findOne({email:email})
      if(!item) {
        res.status(404).json({message:'user not found'});
        return;
      }
      res.status(200).json(item)
    } catch (error) {
       res.status(500).json({ message: error.message })
      
    }
  }

  update = async (req, res) => {
    try {
      const item = await this.model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })

      if (!item) {
        res.status(404).json({ message: "user not found" })
        return;
      }

      res.status(200).json(item)
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error updating document:${error.message}` })
    }
  }

  deleteU = async (req, res) => {
    try {
      const item = await this.model.findByIdAndDelete(req.params.id)
      if (!item) {
        res.status(404).json({ message: "user not found" })
        return;
      }
      res.status(200).json({ message: "user deleted successfully" })
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error deleting document:${error.message}` })
    }
  }
};

export default UserDAO;
