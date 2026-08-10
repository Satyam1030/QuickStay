

// GET /api/user/

export const getUserData=async(req,res)=>{
    try {
        const role=req.user.role;
        const recentSearchedCities=req.user.recentSearchedCities;
        res.json({success:true,role,recentSearchedCities})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//store user recent searched cities
export const storeRecentSearchedCities=async(req,res)=>{
    try {
        const city = req.body.recentSearchedCity || req.body.recentSearchedCities;
        if (!city) {
            return res.json({ success: false, message: "City name is required" });
        }
        const user=req.user;

        if (!user.recentSearchedCities) {
            user.recentSearchedCities = [];
        }

        if(user.recentSearchedCities.length<3){
            user.recentSearchedCities.push(city)
        }else{
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(city);
        }
        await user.save();
        res.json({success:true,message:"City Added"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }

};