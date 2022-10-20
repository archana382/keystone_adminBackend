module.exports = thecatch => (req,res,next)=>{

    Promise.resolve(thecatch(req,res,next)).catch(next);
};