# Ever Prior website

A responsive, multi-page static website ready for GitHub Pages or any standard web host.

## Pages

- Home
- About Us
- Our Services
- Gallery
- Testimonials
- Blog
- Contact Us

## Preview locally

Run a static server from this folder, for example:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a GitHub repository and upload all files in this folder.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select your main branch and the `/ (root)` folder, then save.
5. Add your custom domain in the Pages settings and configure the DNS records shown by GitHub.

## Before launch

- Replace the business name, email, phone number, location, and sample copy.
- Replace the abstract gallery tiles with your own event photographs.
- Replace sample testimonial cards with genuine client feedback.
- The contact form currently opens the visitor's email app. Connect a static form service such as Formspree if you need browser-based submissions.

## Design assets

- Display typography: Playfair Display
- Interface typography: DM Sans
- Demo event photography: Unsplash, loaded through optimized image URLs
- JavaScript rotates the demo photography on each page visit while keeping event categories relevant.
