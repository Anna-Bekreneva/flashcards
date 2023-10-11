import {forwardRef} from 'react'

import * as RadixSlider from '@radix-ui/react-slider'

import s from './slider.module.scss'
import {TextField} from "@/components/ui/textField";
import {SliderProps} from "@radix-ui/react-slider";

type Props = {
    min: number
    max: number
    step: number
    value: [number, number]
} & SliderProps
export const Slider = forwardRef<HTMLDivElement, Props>(({min, max, step, value, ...props}, ref?) => {
    const stringMinvalue = String(min)
    const stringMaxValue = String(max)
    const maxValueForMinInput = max - step
    const minValueForMaxInput = min + step
    const minValue = value[0]
    const maxValue = value[1]
    const changeMinValueHandler = (value: string) => {
        props.onValueChange?.([Number(value), maxValue])
    }
    const changeMaxValueHandler = (value: string) => {
        props.onValueChange?.([minValue, Number(value)])
    }
    const onBlurMinValueHandler = () => {
        if (
            (minValue > min || minValue === min) &&
            (minValue < maxValueForMinInput || minValue === maxValueForMinInput)
        ) {
            props.onValueChange?.([minValue, maxValue])
        } else if (minValue < min) {
            props.onValueChange?.([min, maxValue])
        } else if (minValue > maxValueForMinInput) {
            props.onValueChange?.([maxValueForMinInput, maxValue])
        }
    }
    const onBlurMaxValueHandler = () => {
        if (
            (maxValue < max || maxValue === max) &&
            (maxValue > minValueForMaxInput || maxValue === minValueForMaxInput)
        ) {
            props.onValueChange?.([minValue, maxValue])
        } else if (maxValue > max) {
            props.onValueChange?.([minValue, max])
        } else if (maxValue < minValueForMaxInput) {
            props.onValueChange?.([minValue, minValueForMaxInput])
        }
    }

    return (
        <div className={s.wrapper} ref={ref}>
            <TextField className={s.field}
                       min={stringMinvalue}
                       max={maxValueForMinInput}
                       value={minValue}
                       name={'min value'}
                       onValueChange={changeMinValueHandler}
                       onBlur={onBlurMinValueHandler}
                       type="number"
            />
            <RadixSlider.Root
                className={s.root}
                value={value}
                min={min}
                max={max}
                step={step}
                {...props}
            >
                <RadixSlider.Track className={s.track}>
                    <RadixSlider.Range className={s.range}/>
                </RadixSlider.Track>
                <RadixSlider.Thumb className={s.thumb}/>
                <RadixSlider.Thumb className={s.thumb}/>
            </RadixSlider.Root>
            <TextField className={s.field}
                       min={minValueForMaxInput}
                       max={stringMaxValue}
                       value={maxValue}
                       name={'max value'}
                       onValueChange={changeMaxValueHandler}
                       onBlur={onBlurMaxValueHandler}
                       type="number"
            />
        </div>
    )
})
