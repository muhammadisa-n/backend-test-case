const memberService = require("../service/member-services");
const memberController = {
  getAllMembers: async (req, res) => {
    try {
      const members = await memberService.getAllMember();
      res.status(200).json(members);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getMemberByCode: async (req, res) => {
    try {
      const member = await memberService.findMemberByCode(
        req.params.memberCode
      );
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      res.status(200).json(member);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = memberController;
