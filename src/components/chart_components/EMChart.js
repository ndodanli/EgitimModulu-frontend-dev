import React, { useState, useEffect, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import Chart from 'chart.js'
import { customTooltips as cuiCustomTooltips } from '@coreui/chartjs'
import '@coreui/chartjs/dist/css/coreui-chartjs.css'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const key = () => Math.random().toString(36).replace('0.', '')

//component - CoreUI / EMChart
const EMChart = props => {
  const {
    innerRef,
    datasets,
    labels,
    options,
    plugins,
    type,
    ...attributes
  } = props

  const compData = useRef({ firstRun: true }).current
  const [chart, setChart] = useState()
  const ref = useRef()
  const safeId = useState('safe_id_' + key())[0]

  // methods
  const renderChart = () => {
    destroyChart()
    setChart(new Chart(
      ref.current.getContext('2d'),
      chartConfig
    ))
  }

  const updateChart = () => {
    Object.assign(chart, chartConfig)
    chart.update()
  }

  const destroyChart = () => chart && chart.destroy()

  const dataset = (datasets && datasets[0] && datasets[0].data) || []

  const computedLabels = useMemo(() => {
    if (labels && typeof labels !== 'string') {
      return labels
    }
    const emptyLabels = Array(dataset.length).fill('')
    if (labels === 'indexes') {
      return emptyLabels.map((u, i) => i + 1)
    } else if (labels === 'months') {
      return emptyLabels.map((u, i) => months[i % 12])
    }
    return emptyLabels
  }, [JSON.stringify(labels), dataset.length])


  const customTooltips = (() => {
    if (options && options.tooltips) {
      return
    }
    return {
      tooltips: {
        enabled: false,
        custom: cuiCustomTooltips,
        intersect: true,
        mode: 'index',
        position: 'nearest',
        callbacks: {
          labelColor(tooltipItem, chart) {
            function getValue(prop) {
              return typeof prop === 'object' ? prop[tooltipItem.index] : prop
            }

            const dataset = chart.data.datasets[tooltipItem.datasetIndex]
            //tooltipLabelColor is coreUI custom prop used only here
            const backgroundColor = getValue(
              dataset.tooltipLabelColor ||
              dataset.pointHoverBackgroundColor ||
              dataset.borderColor ||
              dataset.backgroundColor
            )
            return {
              backgroundColor
            }
          }
        }
      }
    }
  })()

  const computedOptions = (() => {
    return Object.assign({}, options, customTooltips || {})
  })()

  const chartConfig = {
    type,
    data: {
      datasets,
      labels: computedLabels
    },
    options: computedOptions,
    plugins
  }

  useEffect(() => {
    if (compData.firstRun) return
    updateChart()
  }, [chartConfig])

  useEffect(() => {
    renderChart()
    compData.firstRun = false
    return () => destroyChart()
  }, [])

  return (
    <div {...attributes} ref={innerRef}>
      <canvas id={safeId} ref={ref} />
    </div>
  )
}

EMChart.propTypes = {
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  datasets: PropTypes.array,
  labels: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  options: PropTypes.object,
  plugins: PropTypes.array,
  type: PropTypes.string
}

const EMChartBar = props => <EMChart {...props} type="bar"/>
const EMChartHorizontalBar = props => <EMChart {...props} type="horizontalBar"/>
const EMChartLine = props => <EMChart {...props} type="line"/>
const EMChartDoughnut = props => <EMChart {...props} type="doughnut"/>
const EMChartRadar = props => <EMChart {...props} type="radar"/>
const EMChartPie = props => <EMChart {...props} type="pie"/>
const EMChartPolarArea = props => <EMChart {...props} type="polarArea"/>
const EMCharts = props => {
  console.warn(
    '<EMCharts> component has been deprecated. Use <EMChart> or <EMChart{type}> instead'
  )
  return <EMChart {...props}/>
}

export {
  EMChart,
  EMCharts,
  EMChartBar,
  EMChartHorizontalBar,
  EMChartLine,
  EMChartDoughnut,
  EMChartRadar,
  EMChartPie,
  EMChartPolarArea
}

