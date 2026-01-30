"use client"

import { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"
import { Badge } from "@/ui/badge"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"

const sponsorUrls: Record<string, string> = {
  cursor: "https://cursor.com",
  vudy: "https://vudy.me",
  ai_collective: "https://aicollective.com",
  startupgrind: "https://www.startupgrind.com",
  paqwallet: "https://paqwallet.com/",
  ampdlabs: "https://www.ampdlabs.io/",
  uca: "https://uca.edu.sv/",
}

export function Sponsors({ dict }: { dict: Dictionary }) {
  const { completeAction } = useXp()
  const { spawnFloater } = useXpFloater()

  const handleInspect = (name: string, e: React.MouseEvent) => {
    const completed = completeAction(`sponsor_${name.toLowerCase()}`, { xp: 15 })
    if (completed) {
      spawnFloater(e.clientX, e.clientY, `+15xp // INSPECT_${name.toUpperCase()}`, "text-yellow-400")
    }
  }

  const handleSponsorClick = (name: string, e: React.MouseEvent) => {
    handleInspect(name, e)
    const url = sponsorUrls[name]
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  const allSponsors = [
    { name: "cursor", image: "/sponsors/cursor.webp", alt: "Cursor", level: 2 },
    { name: "vudy", image: "/sponsors/vudy.webp", alt: "Vudy", level: 1 },
    { name: "ai_collective", image: "/sponsors/aicollective.webp", alt: "The AI Collective", level: 1 },
    { name: "startupgrind", image: "/sponsors/startupgrind.webp", alt: "StartupGrind", level: 1 },
    { name: "paqwallet", image: "/sponsors/paq.png", alt: "PAQWallet", level: 1 },
    { name: "ampdlabs", image: "/sponsors/ampdlabs.webp", alt: "AMPD Labs", level: 1 },
    { name: "uca", image: "/sponsors/uca.svg", alt: "UCA", level: 1 },
  ]

  return (
    <section id="sponsors" className="container mx-auto px-4 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4">
            <span className="text-accent">{dict.sponsors.title_part1}</span> {dict.sponsors.title_part2}
          </h2>
        </div>
        <h3 className="mb-6 text-sm font-mono text-accent uppercase tracking-wider text-center">{dict.sponsors.gold}</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {allSponsors.map((sponsor) => (
            <Card 
              key={sponsor.name}
              level={sponsor.level as 1 | 2}
              interactive
              onClick={(e) => handleSponsorClick(sponsor.name, e)}
              className={sponsor.name === "cursor" ? "col-span-2 flex h-32 items-center justify-center p-4 bg-accent/20 hover:bg-accent/30 border-accent/30 transition-colors cursor-pointer relative" : "flex h-32 items-center justify-center p-4 bg-card-01/50 hover:bg-card-02 transition-colors cursor-pointer"}
            >
              {sponsor.name === "cursor" && (
                <Badge variant="secondary" className="absolute top-2 right-2 text-xs font-mono text-accent uppercase tracking-wider border-accent/30 bg-accent/10">
                  {dict.sponsors.host}
                </Badge>
              )}
              {sponsor.name === "ampdlabs" ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 210 40" fill="none" className="max-h-20 max-w-full object-contain brightness-0 invert" aria-label={sponsor.alt}>
                  <title>{sponsor.alt}</title>
                  <path d="M73.0268 36.1171L79.0912 39.9971V9.42188H62.8467C59.5644 9.42188 56.6155 10.7683 54.5513 12.898C52.4742 10.7683 49.5253 9.42188 46.2559 9.42188C40.0119 9.42188 34.9219 14.2689 34.9219 20.2419V30.4745H40.9863V20.2419C40.9863 17.4635 43.3455 15.2113 46.2559 15.2113C49.1663 15.2113 51.5255 17.4635 51.5255 20.2419V30.4745H57.5899V20.2419C57.5899 17.4635 59.949 15.2113 62.8595 15.2113H73.0396V36.1171H73.0268Z" fill="white" />
                  <path d="M0 20.2209C0 26.1694 5.06441 31.0042 11.2956 31.0042H21.1423V25.2148H11.2956C8.41077 25.2148 6.06447 22.9748 6.06447 20.2209C6.06447 17.4669 8.41077 15.227 11.2956 15.227H25.4759V30.4902H31.5404V9.4375H11.2956C5.06441 9.4375 0 14.2723 0 20.2209Z" fill="white" />
                  <path d="M103.074 9.42188H82.5469V39.9971L88.6113 36.1171V15.2236H103.074C105.959 15.2236 108.305 17.4635 108.305 20.2174C108.305 22.9714 105.959 25.2113 103.074 25.2113H92.7142V31.0008H103.074C109.305 31.0008 114.369 26.166 114.369 20.2174C114.369 14.2688 109.305 9.43409 103.074 9.43409V9.42188Z" fill="white" />
                  <path d="M144.991 3.89228V25.2142H130.452C127.567 25.2142 125.221 22.9743 125.221 20.2203C125.221 17.4663 127.567 15.2264 130.452 15.2264H140.811V9.43696H130.452C124.221 9.43696 119.156 14.2717 119.156 20.2203C119.156 26.1689 124.221 31.0037 130.452 31.0037H151.056V0L144.991 3.88007V3.89228Z" fill="white" />
                  <path d="M188.684 9.30913H185.133V11.4021H188.684C189.287 11.4021 189.787 10.937 189.787 10.3495C189.787 9.76197 189.3 9.29688 188.684 9.29688V9.30913Z" fill="white" />
                  <path d="M189.351 6.38855C189.351 5.81328 188.864 5.33594 188.248 5.33594H185.133V7.42895H188.248C188.851 7.42895 189.351 6.96381 189.351 6.3763V6.38855Z" fill="white" />
                  <path d="M201.065 0H163.64C158.703 0 154.703 3.81885 154.703 8.53122C154.703 13.2436 158.703 17.0624 163.64 17.0624H201.065C206.001 17.0624 210.001 13.2436 210.001 8.53122C210.001 3.81885 206.001 0 201.065 0ZM170.307 13.5741H162.486V3.28029H165.037L164.986 11.481H170.307V13.5741ZM178.961 13.5741L176.115 6.4382L173.499 13.5741H170.755L175.076 3.28029H177.217L181.666 13.5741H178.948H178.961ZM189.141 13.5741H182.82V3.28029H188.68C190.282 3.28029 191.577 4.51653 191.577 6.04652C191.577 6.71971 191.321 7.34396 190.898 7.82132C190.744 8.00492 190.564 8.16402 190.359 8.29865C190.359 8.29865 190.769 8.50673 190.936 8.64137C191.603 9.14321 192.026 9.92655 192.026 10.8078C192.026 12.3378 190.731 13.5741 189.128 13.5741H189.141ZM202.219 10.5263C202.27 12.9621 199.59 13.5741 199.59 13.5741C196.27 14.4308 193.385 12.1053 193.385 12.1053L194.821 10.3672C198.603 13.0722 199.629 11.0649 199.629 11.0649C200.091 9.82865 197.437 9.11871 196.629 8.93512C196.411 8.88616 196.206 8.82496 196.001 8.75153C193.539 7.87025 193.718 6.04652 193.718 6.04652C193.757 5.23868 194.206 4.65115 194.654 4.27172C195.09 3.88004 195.642 3.623 196.218 3.46388C199.308 2.5826 201.962 4.30843 201.962 4.30843L200.642 6.19339C198.411 4.92044 197.231 5.05506 196.693 5.29986C196.27 5.4957 196.103 5.98532 196.372 6.35251C196.77 6.90331 197.834 7.11138 197.834 7.11138C202.693 8.12729 202.257 10.5263 202.257 10.5263H202.219Z" fill="white" />
                </svg>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={sponsor.image} alt={sponsor.alt} className="max-h-20 max-w-full object-contain brightness-0 invert" />
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
