const Experience = require("../models/experienceModel");
const Education = require("../models/educationModel");
const Skill = require("../models/skillModel");
const Resume = require("../models/resumeModel");


const getResume = async (req, res) => {
  const { id } = req.params;
  try {
    const resume = await Resume.findOne({ resumeId: id })
      .populate('education')  // Populate the Education reference
      .populate('skill')      // Populate the Skill reference
      .populate('experience') // Populate the Experience reference
      // .populate('project')    // Populate the Project reference
      .exec();

    if (!resume) {
      throw new Error('Resume not found');
    }

    return res.status(201).json(resume);
  } catch (error) {
    console.error('Error finding resume:', error);
    throw error;
  }
}





const createResume = async (req, res) => {
  const { title, resumeId, userEmail, userName } = req.body;
  try {
    const response = await Resume.create({ title, resumeId, userName });

    res.status(200).json(response);
  } catch (error) {
    console.log(error?.message);
    res.status(404).json(error.message);
  }
};

const updateResume = async (req, res) => {
  const { email, firstName, lastName, address, phone, jobTitle, summery, city, companyName, startDate, endDate, state, title, workSummery } = req.body;
  const { id } = req.params;

  try {
    // Find the resume by id
    const resume = await Resume.findOne({ resumeId: id });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Check if email is being updated and drop index if necessary
    if (email && resume.email !== email) {
      const indexes = await Resume.collection.getIndexes();
      if (indexes.email_1) {
        await Resume.collection.dropIndex('email_1');
      }
    }

    // Update only the fields that are provided
    const updateFields = {};
    if (firstName) updateFields.firstName = firstName;
    if (email) updateFields.email = email;
    if (lastName) updateFields.lastName = lastName;
    if (address) updateFields.address = address;
    if (phone) updateFields.phone = phone;
    if (jobTitle) updateFields.jobTitle = jobTitle;
    if (summery) updateFields.summery = summery;

    Object.assign(resume, updateFields);

    // Save the updated resume
    await resume.save();

    res.status(200).json({ resume });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const updateResumeExperience = async (req, res) => {
  const { city, companyName, startDate, endDate, state, title, workSummery, resumeId } = req.body;
  const { id } = req.params;

  try {
    // Create a new experience entry
    const response = await Experience.create({ city, companyName, startDate, endDate, state, title, workSummery });

    if (response) {
      // Find the resume and update the experiences array by pushing the new experience
      const updatedResume = await Resume.findOneAndUpdate(
        { resumeId }, // Filter criteria to find the resume by ID
        { $push: { experience: response._id } }, // Append the new experience to the existing experiences array
        { new: true, runValidators: true } // Options: return updated doc and run validators
      );

      if (!updatedResume) {
        return res.status(404).json({ message: 'Resume not found' });
      }

      // Check if there is an email index and drop it if it exists
      const indexes = await Resume.collection.getIndexes();
      if (indexes?.email_1) {
        await Resume.collection.dropIndex('email_1');
      }

      // Respond with the updated resume
      return res.status(200).json({ updatedResume });
    }

  } catch (error) {
    console.log( " here "  + error.message);
    return res.status(400).json({ error: error.message });
  }
};




const updateResumeEducation = async (req, res) => {
  const { resumeId, universityName, degree, major, startDate, endDate, description } = req.body;

  try {
    // Create a new education entry
    const response = await Education.create({ universityName, degree, major, startDate, endDate, description });

    if (response) {
      // Find the resume and update the education array by pushing the new education entry
      const updatedResume = await Resume.findOneAndUpdate(
        {resumeId }, // Filter criteria to find the resume by ID
        { $push: { education: response._id } }, // Append the new education to the existing education array
        { new: true, runValidators: true } // Options: return updated doc and run validators
      );

      if (!updatedResume) {
        return res.status(404).json({ message: 'Resume not found' });
      }

      // Check if there is an email index and drop it if it exists
      const indexes = await Resume.collection.getIndexes();
      if (indexes?.email_1) {
        await Resume.collection.dropIndex('email_1');
      }

      // Respond with the updated resume
      return res.status(200).json({ updatedResume });
    }

  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};


const updateResumeSkill = async (req, res) => {
  const { resumeId, rating, skill } = req.body;
  const { id } = req.params;

  try {
    // Create a new skill
    const response = await Skill.create({ rating, skill });

    if (response) {
      // Find the resume and update the skills array by pushing the new skill
      const updatedResume = await Resume.findOneAndUpdate(
        { resumeId }, // Filter criteria to find the resume by ID
        { $push: { skill: response._id } }, // Append the new skill to the existing skills array
        { new: true, runValidators: true } // Options: return updated doc and run validators
      );

      if (!updatedResume) {
        return res.status(404).json({ message: 'Resume not found' });
      }

      // Check if there is an email index and drop it if it exists
      const indexes = await Resume.collection.getIndexes();
      if (indexes?.email_1) {
        await Resume.collection.dropIndex('email_1');
      }

      // Respond with the updated resume
      return res.status(200).json({ updatedResume });
    }

  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};





module.exports = { getResume, updateResumeExperience, updateResume, createResume, updateResumeEducation, updateResumeSkill };
