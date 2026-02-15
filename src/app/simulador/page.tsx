"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Input from "@/components/ui/Input"
import { Select } from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import { calculateMortgage, formatPrice, getWhatsAppUrl } from "@/lib/utils"
import { useSiteConfig } from "@/contexts/SiteConfigContext"

const PLAZO_OPTIONS = [
  { value: "5", label: "5 años" },
  { value: "10", label: "10 años" },
  { value: "15", label: "15 años" },
  { value: "20", label: "20 años" },
  { value: "25", label: "25 años" },
]

const DOWN_PAYMENT_PRESETS = [10, 15, 20]

export default function SimuladorPage() {
  return (
    <Suspense>
      <SimuladorContent />
    </Suspense>
  )
}

function SimuladorContent() {
  const searchParams = useSearchParams()
  const { config } = useSiteConfig()

  const [precio, setPrecio] = useState("")
  const [enganche, setEnganche] = useState("")
  const [enganchePercent, setEnganchePercent] = useState<number | null>(null)
  const [plazo, setPlazo] = useState("15")
  const [tasa, setTasa] = useState("5")
  const [resultado, setResultado] = useState<{
    monthlyPayment: number
    totalInterest: number
    totalCost: number
    principal: number
  } | null>(null)

  useEffect(() => {
    const precioParam = searchParams.get("precio")
    if (precioParam) {
      setPrecio(precioParam)
    }
  }, [searchParams])

  const precioNum = parseFloat(precio) || 0
  const engancheNum = parseFloat(enganche) || 0

  function handleEnganchePreset(percent: number) {
    if (!precioNum) return
    setEnganchePercent(percent)
    setEnganche(Math.round(precioNum * percent / 100).toString())
  }

  function handleEngancheChange(value: string) {
    setEnganche(value)
    setEnganchePercent(null)
  }

  function handleCalcular(e: React.FormEvent) {
    e.preventDefault()
    if (!precioNum || engancheNum >= precioNum) return
    const tasaNum = parseFloat(tasa) || 0
    const plazoNum = parseInt(plazo)
    const result = calculateMortgage(precioNum, engancheNum, tasaNum, plazoNum)
    setResultado({
      ...result,
      principal: precioNum - engancheNum,
    })
  }

  const capitalPercent = resultado
    ? Math.round((resultado.principal / resultado.totalCost) * 100)
    : 0
  const interestPercent = resultado ? 100 - capitalPercent : 0

  const whatsappMsg = resultado
    ? `Hola, realicé una simulación de crédito:\n• Precio: $${precioNum.toLocaleString("en-US")}\n• Enganche: $${engancheNum.toLocaleString("en-US")}\n• Plazo: ${plazo} años\n• Tasa: ${tasa}%\n• Cuota mensual: $${resultado.monthlyPayment.toFixed(2)}\nMe gustaría más información.`
    : ""

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <div className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">Herramienta</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 text-foreground tracking-tight">Simulador de Crédito</h1>
          <p className="text-muted text-lg max-w-2xl mx-auto font-light">
            Calcula tu cuota mensual estimada y planifica la compra de tu inmueble
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="bg-surface border border-border rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-semibold text-foreground mb-6 tracking-tight">Datos del crédito</h2>
            <form onSubmit={handleCalcular} className="space-y-5">
              <Input
                label="Precio del inmueble (USD)"
                type="number"
                min="0"
                step="100"
                placeholder="Ej: 150000"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Enganche / Inicial (USD)
                </label>
                <div className="flex gap-2 mb-2">
                  {DOWN_PAYMENT_PRESETS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handleEnganchePreset(p)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                        enganchePercent === p
                          ? "bg-accent text-white"
                          : "bg-surface-2 text-foreground hover:bg-border border border-border"
                      }`}
                    >
                      {p}%
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="0"
                  step="100"
                  placeholder="Monto de enganche"
                  value={enganche}
                  onChange={(e) => handleEngancheChange(e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none transition-all duration-200 text-foreground placeholder:text-muted-2"
                />
                {precioNum > 0 && engancheNum > 0 && (
                  <p className="text-xs text-muted">
                    {((engancheNum / precioNum) * 100).toFixed(1)}% del precio
                  </p>
                )}
              </div>

              <Select
                label="Plazo (años)"
                options={PLAZO_OPTIONS}
                value={plazo}
                onChange={(e) => setPlazo(e.target.value)}
              />

              <Input
                label="Tasa de interés anual (%)"
                type="number"
                min="0"
                max="30"
                step="0.1"
                value={tasa}
                onChange={(e) => setTasa(e.target.value)}
                required
              />

              <Button type="submit" className="w-full" size="lg">
                Calcular cuota
              </Button>
            </form>
          </div>

          {/* Resultados */}
          <div className="space-y-6">
            {resultado ? (
              <>
                {/* Cuota mensual */}
                <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 text-center">
                  <p className="text-sm text-muted mb-1">Tu cuota mensual estimada</p>
                  <p className="text-4xl md:text-5xl font-bold text-accent tracking-tight">
                    {formatPrice(Math.round(resultado.monthlyPayment))}
                  </p>
                  <p className="text-sm text-muted mt-2">por {plazo} años ({parseInt(plazo) * 12} cuotas)</p>
                </div>

                {/* Desglose */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-surface border border-border rounded-2xl p-4 text-center">
                    <p className="text-xs text-muted mb-1">Capital financiado</p>
                    <p className="text-lg font-bold text-foreground">
                      {formatPrice(Math.round(resultado.principal))}
                    </p>
                  </div>
                  <div className="bg-surface border border-border rounded-2xl p-4 text-center">
                    <p className="text-xs text-muted mb-1">Total intereses</p>
                    <p className="text-lg font-bold text-accent">
                      {formatPrice(Math.round(resultado.totalInterest))}
                    </p>
                  </div>
                  <div className="bg-surface border border-border rounded-2xl p-4 text-center">
                    <p className="text-xs text-muted mb-1">Costo total</p>
                    <p className="text-lg font-bold text-foreground">
                      {formatPrice(Math.round(resultado.totalCost))}
                    </p>
                  </div>
                </div>

                {/* Gráfico visual */}
                <div className="bg-surface border border-border rounded-2xl p-6">
                  <h3 className="text-sm font-semibold text-foreground mb-4">Capital vs Intereses</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted">Capital</span>
                        <span className="font-medium text-foreground">{capitalPercent}%</span>
                      </div>
                      <div className="w-full bg-surface-2 rounded-full h-3">
                        <div
                          className="bg-foreground h-3 rounded-full transition-all duration-500"
                          style={{ width: `${capitalPercent}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted">Intereses</span>
                        <span className="font-medium text-foreground">{interestPercent}%</span>
                      </div>
                      <div className="w-full bg-surface-2 rounded-full h-3">
                        <div
                          className="bg-accent h-3 rounded-full transition-all duration-500"
                          style={{ width: `${interestPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA WhatsApp */}
                <a
                  href={getWhatsAppUrl(config.whatsapp, whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-success hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-full transition-colors duration-200"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Consultar por WhatsApp
                </a>
              </>
            ) : (
              <div className="bg-surface border border-border rounded-2xl p-8 text-center">
                <svg className="w-16 h-16 text-border mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight">Ingresa los datos</h3>
                <p className="text-muted text-sm font-light">
                  Completa el formulario para ver el cálculo de tu cuota mensual estimada.
                </p>
              </div>
            )}

            <p className="text-xs text-muted-2 text-center">
              * Esta simulación es referencial. Los valores finales pueden variar según las condiciones del crédito.
              Consulta con nuestros asesores para más información.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
