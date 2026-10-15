import math, sys, subprocess, os

def render_video(filename, width=960, height=540, fps=30, duration=4, mode="grid"):
    filepath = os.path.join("public/videos", filename)
    print(f"Generating {filepath} ({mode})...")
    total_frames = fps * duration

    cmd = [
        'ffmpeg', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24',
        '-s', f'{width}x{height}', '-r', str(fps), '-i', '-',
        '-c:v', 'libx264', '-preset', 'ultrafast', '-crf', '22',
        '-pix_fmt', 'yuv420p', '-movflags', '+faststart', filepath
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stderr=subprocess.DEVNULL)

    # Pre-generate some random points for particle systems
    num_particles = 80
    particles = []
    for i in range(num_particles):
        particles.append({
            'x': (i * 137.5) % width,
            'y': (i * 93.7) % height,
            'vx': math.cos(i * 0.8) * 1.2,
            'vy': math.sin(i * 0.8) * 1.2,
            'rad': (i % 3) + 1.5,
            'hue': i % 3 # 0: cyan, 1: blue, 2: purple
        })

    for f in range(total_frames):
        t = f / fps
        progress = f / total_frames
        buf = bytearray(width * height * 3)

        if mode == "grid":
            # 3D Cybernetic Perspective Grid with undulating terrain
            horizon = int(height * 0.42)
            # Sky particles
            for i, p in enumerate(particles):
                px = int((p['x'] + p['vx'] * t * 25) % width)
                py = int((p['y'] + p['vy'] * t * 20) % horizon)
                rad = int(p['rad'])
                for dy in range(-rad, rad + 1):
                    for dx in range(-rad, rad + 1):
                        nx, ny = px + dx, py + dy
                        if 0 <= nx < width and 0 <= ny < horizon:
                            idx = (ny * width + nx) * 3
                            buf[idx] = min(255, buf[idx] + 20)
                            buf[idx+1] = min(255, buf[idx+1] + 160)
                            buf[idx+2] = min(255, buf[idx+2] + 240)

            # Perspective grid floor
            for y in range(horizon, height):
                # distance scaling
                depth = (y - horizon) / (height - horizon) # 0 to 1
                if depth <= 0: continue
                # moving horizontal lines
                grid_pos = ((1.0 / depth) * 4.0 - t * 4.0) % 1.0
                is_horiz = grid_pos < 0.08

                # wave height modulation
                wave = math.sin(depth * 10 - t * 6) * 0.15 * (1.0 - depth)

                for x in range(0, width, 2):
                    # vanishing vertical lines
                    nx = (x - width * 0.5) / (width * 0.5) # -1 to 1
                    world_x = nx / depth
                    is_vert = (world_x % 0.25) < 0.015

                    if is_horiz or is_vert:
                        intensity = int(depth * 255)
                        idx = (y * width + x) * 3
                        buf[idx] = int(intensity * 0.15)
                        buf[idx+1] = int(intensity * 0.85)
                        buf[idx+2] = intensity

        elif mode == "radar":
            # Holographic Radar & Telemetry Rings
            cx, cy = width // 2, height // 2
            # Rotating sweep line
            angle = (t * 2 * math.pi / duration) * 2
            sweep_cos = math.cos(angle)
            sweep_sin = math.sin(angle)

            # Rings
            radii = [60, 120, 180, 240]
            for r in radii:
                pulse_r = r + math.sin(t * 4 + r * 0.1) * 3
                for a_deg in range(0, 360, 2):
                    rad = math.radians(a_deg)
                    rx = int(cx + math.cos(rad) * pulse_r)
                    ry = int(cy + math.sin(rad) * pulse_r)
                    if 0 <= rx < width and 0 <= ry < height:
                        idx = (ry * width + rx) * 3
                        buf[idx] = 15
                        buf[idx+1] = 180
                        buf[idx+2] = 230

            # Sweep line gradient
            for d in range(10, 250):
                sx = int(cx + sweep_cos * d)
                sy = int(cy + sweep_sin * d)
                if 0 <= sx < width and 0 <= sy < height:
                    idx = (sy * width + sx) * 3
                    buf[idx] = 120
                    buf[idx+1] = 240
                    buf[idx+2] = 255

            # Digital coordinate ticks
            for p in particles[:40]:
                px = int(cx + math.cos(p['x'] + t) * (p['y'] % 200 + 40))
                py = int(cy + math.sin(p['x'] + t) * (p['y'] % 200 + 40))
                if 0 <= px < width and 0 <= py < height:
                    idx = (py * width + px) * 3
                    buf[idx] = 240
                    buf[idx+1] = 255
                    buf[idx+2] = 255

        elif mode == "neural":
            # Synaptic Network Nodes & Electric Pulses
            for i in range(len(particles)):
                p1 = particles[i]
                x1 = int((p1['x'] + math.sin(t * 2 + i) * 30) % width)
                y1 = int((p1['y'] + math.cos(t * 2 + i) * 30) % height)

                # Connect to nearest
                for j in range(i + 1, min(i + 4, len(particles))):
                    p2 = particles[j]
                    x2 = int((p2['x'] + math.sin(t * 2 + j) * 30) % width)
                    y2 = int((p2['y'] + math.cos(t * 2 + j) * 30) % height)

                    dist = math.hypot(x2 - x1, y2 - y1)
                    if dist < 160:
                        steps = int(dist // 3)
                        for s in range(0, steps, 2):
                            frac = s / max(1, steps)
                            lx = int(x1 + (x2 - x1) * frac)
                            ly = int(y1 + (y2 - y1) * frac)
                            if 0 <= lx < width and 0 <= ly < height:
                                pulse = (frac - (t * 2) % 1.0) ** 2
                                glow = int(max(0, 1.0 - pulse * 12) * 220)
                                idx = (ly * width + lx) * 3
                                buf[idx] = min(255, buf[idx] + 20)
                                buf[idx+1] = min(255, buf[idx+1] + 60 + glow)
                                buf[idx+2] = min(255, buf[idx+2] + 180 + glow)

                # Draw node
                for dy in range(-3, 4):
                    for dx in range(-3, 4):
                        nx, ny = x1 + dx, y1 + dy
                        if 0 <= nx < width and 0 <= ny < height:
                            idx = (ny * width + nx) * 3
                            buf[idx] = 180
                            buf[idx+1] = 230
                            buf[idx+2] = 255

        elif mode == "orbital":
            # 3D Rotating Sphere / Orbit Latitude Rings
            cx, cy = width // 2, height // 2
            globe_r = 180
            rot = t * 2 * math.pi / duration

            # Latitude lines
            for lat in range(-60, 70, 20):
                lat_r = globe_r * math.cos(math.radians(lat))
                lat_y = cy - globe_r * math.sin(math.radians(lat)) * 0.4
                for lon in range(0, 360, 4):
                    angle = math.radians(lon) + rot
                    x = cx + lat_r * math.cos(angle)
                    y = lat_y + lat_r * math.sin(angle) * 0.25
                    z = lat_r * math.sin(angle) # depth
                    if z > -20 and 0 <= int(x) < width and 0 <= int(y) < height:
                        brightness = int((z + 180) / 360 * 200 + 55)
                        idx = (int(y) * width + int(x)) * 3
                        buf[idx] = int(brightness * 0.2)
                        buf[idx+1] = int(brightness * 0.8)
                        buf[idx+2] = brightness

            # Outer glow aura
            for angle_deg in range(0, 360, 2):
                rad = math.radians(angle_deg) + rot * 1.5
                ox = cx + math.cos(rad) * (globe_r + 20)
                oy = cy + math.sin(rad) * ((globe_r + 20) * 0.5)
                if 0 <= int(ox) < width and 0 <= int(oy) < height:
                    idx = (int(oy) * width + int(ox)) * 3
                    buf[idx] = 120
                    buf[idx+1] = 220
                    buf[idx+2] = 255

        elif mode == "matrix":
            # Cyberpunk Matrix Data Streams
            cols = width // 20
            for c in range(cols):
                cx_pos = c * 20 + 10
                speed = 80 + (c % 7) * 30
                head_y = int((t * speed + c * 57) % (height + 150)) - 100

                for trail in range(25):
                    ty = head_y - trail * 8
                    if 0 <= ty < height:
                        fade = 1.0 - (trail / 25)
                        idx = (ty * width + cx_pos) * 3
                        if trail == 0:
                            buf[idx] = 255
                            buf[idx+1] = 255
                            buf[idx+2] = 255
                        else:
                            buf[idx] = int(fade * 10)
                            buf[idx+1] = int(fade * 240)
                            buf[idx+2] = int(fade * 200)

        proc.stdin.write(buf)

    proc.stdin.close()
    proc.wait()
    print(f"Done: {filepath} ({os.path.getsize(filepath)} bytes)")

if __name__ == "__main__":
    render_video("hero-bg.mp4", mode="grid")
    render_video("work-bg.mp4", mode="radar")
    render_video("capabilities-bg.mp4", mode="neural")
    render_video("what-if-bg.mp4", mode="orbital")
    render_video("contact-bg.mp4", mode="matrix")

    # Case studies project videos
    render_video("omnihealth-ai.mp4", width=640, height=360, duration=3, mode="neural")
    render_video("veloce-capital.mp4", width=640, height=360, duration=3, mode="radar")
    render_video("aerologix-global.mp4", width=640, height=360, duration=3, mode="orbital")
    render_video("sentinel-qa.mp4", width=640, height=360, duration=3, mode="matrix")
    render_video("solaris-os.mp4", width=640, height=360, duration=3, mode="grid")
    render_video("synapse-copilot.mp4", width=640, height=360, duration=3, mode="neural")
