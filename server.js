const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const app = express(), server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
app.use(express.static(path.join(__dirname, "public")));
app.get("/health", (_,res)=>res.json({ok:true,game:"Xom Online",players:io.engine.clientsCount}));
const players = new Map();
const rooms = ["cho-xom","ngo-88","cong-vien"];
const clean = (s,max=18)=>String(s||"").replace(/[<>]/g,"").trim().slice(0,max);
io.on("connection", socket=>{
  socket.on("join", data=>{
    const name=clean(data?.name,18)||"Khách Xóm";
    const room=rooms.includes(data?.room)?data.room:"cho-xom";
    socket.join(room);
    const p={id:socket.id,name,room,x:Math.random()*700+80,y:Math.random()*400+80,color:["#f6b26b","#8bd3dd","#c7a4f5","#f18ca8","#9bd18b"][Math.floor(Math.random()*5)]};
    players.set(socket.id,p);
    socket.emit("welcome",{self:p,players:[...players.values()].filter(q=>q.room===room)});
    socket.to(room).emit("playerJoined",p);
    io.to(room).emit("system",`${name} đã vào xóm 🌿`);
  });
  socket.on("move",pos=>{
    const p=players.get(socket.id); if(!p)return;
    p.x=Math.max(24,Math.min(900,Number(pos.x)||p.x));p.y=Math.max(24,Math.min(560,Number(pos.y)||p.y));
    socket.to(p.room).emit("playerMoved",{id:p.id,x:p.x,y:p.y});
  });
  socket.on("chat",text=>{
    const p=players.get(socket.id);if(!p)return;
    text=clean(text,180);if(!text)return;
    io.to(p.room).emit("chat",{id:p.id,name:p.name,text,at:Date.now()});
  });
  socket.on("disconnect",()=>{
    const p=players.get(socket.id);if(!p)return;
    players.delete(socket.id);io.to(p.room).emit("playerLeft",socket.id);
    io.to(p.room).emit("system",`${p.name} đã rời xóm`);
  });
});
const PORT=process.env.PORT||3000;
server.listen(PORT,()=>console.log("Xom Online running on "+PORT));