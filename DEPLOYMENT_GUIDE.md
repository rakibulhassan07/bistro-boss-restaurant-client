# 🚀 Deployment Guide for Bistro Boss Restaurant

## Issues Fixed:

### 1. ❌ **Fixed URL Typo**
- **Problem**: `hhttps://` (double 'h') in axios configuration
- **Solution**: Changed to `https://` and used environment variables

### 2. ❌ **Fixed Environment Configuration**
- **Problem**: Hardcoded backend URLs
- **Solution**: Added environment variables for different environments

### 3. ❌ **Added Deployment Configuration**
- **Problem**: Missing deployment configs
- **Solution**: Added `vercel.json` and updated build settings

---

## 📁 Files Updated:

1. **`src/Hook/useAxiosPublic.jsx`** - Fixed typo and added env variable
2. **`src/Hook/useAxiosSecure.jsx`** - Fixed typo and added env variable  
3. **`.env.local`** - Added API URL configuration
4. **`.env.production`** - Created for production deployment
5. **`vite.config.js`** - Added build and server configurations
6. **`vercel.json`** - Created for Vercel deployment

---

## 🛠️ How to Deploy:

### **Step 1: Test Locally**
```bash
npm run dev
```
Your app should now connect to: `http://localhost:5000`

### **Step 2: Build for Production**
```bash
npm run build
```

### **Step 3: Deploy to Vercel**

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Option B: Using GitHub + Vercel Dashboard
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Add environment variables in Vercel dashboard:
   - `VITE_API_URL` = `http://localhost:5000`
   - Add all your Firebase env variables too

### **Step 4: Set Environment Variables in Vercel**
In your Vercel dashboard, add these environment variables:
```
VITE_API_URL=http://localhost:5000
VITE_apiKey=AIzaSyDDyb9QlkyCvRl-1Aw1K4S73Py_EvZWzBg
VITE_authDomain=the-pizza-garden-32f27.firebaseapp.com
VITE_projectId=the-pizza-garden-32f27
VITE_storageBucket=the-pizza-garden-32f27.firebasestorage.app
VITE_messagingSenderId=53710502032
VITE_appId=1:53710502032:web:a49b15788561cf4bf64015
VITE_IMGBB_API_KEY=6629e7ced6a1b479fdc2d7066cb511a2
VITE_Payment_Geteway_PK=pk_test_51Rdx7rGhfd73Hrqgx8IITohVWtISE3g55I1WG8OaKch76naMfVmSqVvZBNfWCSOsbVnhGtVF341HcXQY5jqJ9Vju00ao6Kpvr5
```

---

## 🔄 Environment Configuration:

- **Development**: Uses `.env.local` → Can point to localhost:5000 for local backend testing
- **Production**: Uses `.env.production` → Points to your Vercel backend

---

## 🧪 Testing:

1. **Local Development**: 
   ```bash
   npm run dev
   ```
   Should connect to your Vercel backend

2. **Production Build**:
   ```bash
   npm run build && npm run preview
   ```
   Test the production build locally

---

## 🔍 Common Issues & Solutions:

### Issue: "Network Error" or CORS errors
**Solution**: Make sure your backend at `http://localhost:5000` has CORS configured to allow your frontend domain.

### Issue: Environment variables not working
**Solution**: 
- Make sure all env variables start with `VITE_`
- Restart dev server after adding new env variables
- In Vercel, redeploy after adding env variables

### Issue: 404 errors on refresh
**Solution**: The `vercel.json` file handles this with SPA routing

---

## 📞 Next Steps:

1. Test the fixes locally first
2. If working locally, deploy to Vercel
3. Update your backend CORS settings if needed
4. Test all features on the deployed version

Your app should now properly connect to your backend! 🎉
