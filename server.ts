import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Mock Database Data (Since we'll set up Drizzle later, let's have some initial structure)
  const campaigns = [
    { id: 1, title: "Medicinal Garden Conservation", description: "Preserving rare medicinal plant species in our botanical gardens.", goal: 10000, raised: 4500, image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2000&auto=format&fit=crop" },
    { id: 2, title: "Natural Health Camps", description: "Bringing natural healing to remote communities in Western Uganda.", goal: 5000, raised: 2100, image: "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?q=80&w=2000&auto=format&fit=crop" },
    { id: 3, title: "Plant Medic Hospital Equipment", description: "Upgrading our facility with modern diagnostic tools for natural medicine.", goal: 20000, raised: 12000, image: "https://images.unsplash.com/photo-1579154273821-0a1553a5929d?q=80&w=2000&auto=format&fit=crop" },
    { id: 4, title: "Women’s Herbal Healing", description: "Empowering women through herbal medicine education and health support.", goal: 8000, raised: 3200, image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2000&auto=format&fit=crop" },
    { id: 5, title: "Indigenous Wisdom Archive", description: "Documenting and digitizing ancient healing practices from village elders.", goal: 12000, raised: 6800, image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2000&auto=format&fit=crop" },
    { id: 6, title: "Rukungiri Wellness Center", description: "Building a dedicated space for meditation, yoga, and plant-based detox.", goal: 25000, raised: 18500, image: "https://images.unsplash.com/photo-1545208393-216c7ffdb33e?q=80&w=2000&auto=format&fit=crop" },
    { id: 7, title: "Mobile Herb Dispensary", description: "A specialized vehicle to deliver fresh herbal remedies to distant villages.", goal: 15000, raised: 4200, image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2000&auto=format&fit=crop" },
    { id: 8, title: "Youth Botanical Fellowship", description: "Training the next generation of Ugandan plant medics and conservationists.", goal: 6000, raised: 1500, image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop" },
  ];

  const contacts: any[] = [];

  app.get("/api/campaigns", (req, res) => {
    res.json(campaigns);
  });

  app.post("/api/contact", (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    console.log(`Contact message from ${name}: ${subject}`);
    contacts.push({ name, email, phone, subject, message, date: new Date() });
    res.json({ success: true, message: "Message received! We will get back to you soon." });
  });

  app.post("/api/donate", async (req, res) => {
    const { amount, campaignId, email, name, frequency } = req.body;
    // Here we would normally create a Stripe PaymentIntent
    // For now, let's simulate success
    console.log(`Donation received: $${amount} for campaign ${campaignId} from ${name} (${email})`);
    res.json({ success: true, clientSecret: "mock_secret" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
