# 🚀 Render.com Deployment Guide - New Valley Hub

## ✅ Pre-Deployment Checklist

Your project is now **production-ready**! The following files have been updated:

- ✅ `backend/requirements.txt` - Added production dependencies
- ✅ `backend/new_valley_hub/settings.py` - Configured for production

---

## 📋 Step-by-Step Deployment

### **Step 1: Create PostgreSQL Database on Render**

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"PostgreSQL"**
3. Fill in:
   - **Name:** `new-valley-hub-db`
   - **Database:** `new_valley_hub`
   - **User:** (auto-generated)
   - **Region:** `Frankfurt (EU Central)` 🇪🇺
   - **Plan:** `Free`
4. Click **"Create Database"**
5. **IMPORTANT:** Copy the **Internal Database URL** (it starts with `postgresql://...`)

---

### **Step 2: Generate Secret Key**

Run this command locally to generate a secure secret key:

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

**Copy the output** - you'll need it for environment variables.

---

### **Step 3: Create Web Service on Render**

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select your **`new-valley-hub`** repository

---

### **Step 4: Configure Web Service**

Fill in the following values **EXACTLY**:

| Field | Value |
|-------|-------|
| **Name** | `new-valley-hub-backend` |
| **Language** | `Python` |
| **Region** | `Frankfurt (EU Central)` |
| **Branch** | `main` (or your default branch) |
| **Root Directory** | `backend` |
| **Build Command** | `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate` |
| **Start Command** | `gunicorn new_valley_hub.wsgi:application` |
| **Plan** | `Free` |

---

### **Step 5: Add Environment Variables**

In the **Environment** section, add these variables:

#### Required Variables:

| Key | Value | Example/Notes |
|-----|-------|---------------|
| `PYTHON_VERSION` | `3.11.0` | Python runtime |
| `SECRET_KEY` | `<paste-from-step-2>` | The secret key you generated |
| `DEBUG` | `False` | **Must be False in production** |
| `ALLOWED_HOSTS` | `new-valley-hub-backend.onrender.com` | Replace with your actual Render URL |
| `DATABASE_URL` | `<paste-from-step-1>` | The Internal Database URL from PostgreSQL |
| `GEMINI_API_KEY` | `your_actual_gemini_api_key` | Your Google Gemini API key |

#### Optional Variables:

| Key | Value | Notes |
|-----|-------|-------|
| `FRONTEND_URL` | `https://your-frontend.vercel.app` | If deploying frontend separately |
| `DJANGO_SETTINGS_MODULE` | `new_valley_hub.settings` | Usually auto-detected |

---

### **Step 6: Deploy!**

1. Click **"Create Web Service"**
2. Render will automatically:
   - ✅ Clone your repository
   - ✅ Install dependencies
   - ✅ Run migrations
   - ✅ Collect static files
   - ✅ Start Gunicorn server

**Estimated time:** 3-5 minutes

---

## 🔍 Verify Deployment

### Check These URLs:

1. **Django Admin:**
   ```
   https://new-valley-hub-backend.onrender.com/admin/
   ```

2. **API Endpoints:**
   ```
   https://new-valley-hub-backend.onrender.com/api/tourism/attractions/
   https://new-valley-hub-backend.onrender.com/api/tourism/hotels/
   https://new-valley-hub-backend.onrender.com/api/tourism/chat/
   ```

3. **Search API:**
   ```
   https://new-valley-hub-backend.onrender.com/api/tourism/search/?q=desert
   ```

---

## 🎯 Quick Copy-Paste Configuration

### Build Command:
```bash
pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate
```

### Start Command:
```bash
gunicorn new_valley_hub.wsgi:application
```

### Environment Variables (Template):
```env
PYTHON_VERSION=3.11.0
SECRET_KEY=<generate-with-django-command>
DEBUG=False
ALLOWED_HOSTS=new-valley-hub-backend.onrender.com
DATABASE_URL=<from-render-postgresql-database>
GEMINI_API_KEY=<your-api-key>
```

---

## 🐛 Troubleshooting

### Issue: "Application failed to start"
**Solution:** Check logs for missing dependencies or syntax errors in settings.py

### Issue: "Static files not loading"
**Solution:** Ensure `collectstatic` ran successfully in build command

### Issue: "Database connection error"
**Solution:** Verify `DATABASE_URL` is the **Internal Database URL** from Render PostgreSQL

### Issue: "ALLOWED_HOSTS validation failed"
**Solution:** Make sure your Render URL is in `ALLOWED_HOSTS` environment variable

---

## 📱 Frontend Deployment (Next Steps)

Your frontend (`React + Vite`) should be deployed separately to:
- **Vercel** (recommended for React)
- **Netlify**
- **Render Static Site**

**Update your frontend API base URL** to:
```javascript
const API_BASE_URL = 'https://new-valley-hub-backend.onrender.com/api';
```

Then add that frontend URL to the `FRONTEND_URL` environment variable on Render.

---

## 🎉 Success Checklist

After deployment, verify:
- [ ] Backend API responding at `https://your-app.onrender.com/api/`
- [ ] Django Admin accessible
- [ ] Database migrations completed
- [ ] Static files loading
- [ ] AI Chatbot working (test `/api/tourism/chat/`)
- [ ] Search functionality working
- [ ] CORS allowing your frontend domain

---

## 📊 Free Tier Limits

**Render Free Tier:**
- ✅ 750 hours/month (enough for 24/7 uptime)
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ Cold starts take ~30 seconds
- ✅ 512 MB RAM
- ✅ PostgreSQL: 90 days data retention

**Upgrade if needed:**
- $7/month for always-on instance
- Better for production traffic

---

## 🔗 Useful Links

- [Render Dashboard](https://dashboard.render.com/)
- [Render Docs - Django](https://render.com/docs/deploy-django)
- [Django Deployment Checklist](https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/)

---

**Made with ❤️ for New Valley Hub**  
*Good luck with your deployment! 🚀*
