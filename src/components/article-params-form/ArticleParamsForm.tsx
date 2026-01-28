import { useState, useRef } from 'react';

import {
	defaultArticleState,
	ArticleStateType,
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions
} from '../../constants/articleProps';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	onApply?: (params: ArticleStateType) => void;
	onReset?: () => void;
};

export const ArticleParamsForm = ({ onApply, onReset}: ArticleParamsFormProps) => {
	// состояние открытия/закрытия сайдбара
	const [isOpen, setIsOpen] = useState(false);

	// Ref для сайдбара, чтобы отслеживать клики вне его
	const sidebarRef = useRef<HTMLDivElement>(null);

	// состояние формы (текущие значения)
	const [formState, setFormState] = useState(defaultArticleState);

	// Используем готовый хук для закрытия вне клика сайдбара
	useOutsideClickClose({
		isOpen,
		rootRef: sidebarRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	// обработчик открытия/закрытия сайдбара
	const handleArrowClick = () => {
		setIsOpen(!isOpen);
	};

	// обработчик изменения полей формы
	const handleChange = (
		fieldName: keyof ArticleStateType,
		value: OptionType
	) => {
		setFormState((prev) => ({
			...prev,
			[fieldName]: value,
		}));
	};

	//обработчик применения настроек полей формы
	const handleApply = () => {
		onApply?.(formState);
	};

	//обработчик сброса настроек полей формы
	const handleReset = () => {
		setFormState(defaultArticleState);
		onReset?.();
	};
	// не забыть удалить!!!
	const isOpenForDevelopment = isOpen;

	return (
		<>
			<ArrowButton isOpen={isOpenForDevelopment} onClick={handleArrowClick} />
			{isOpenForDevelopment && (
				<div ref={sidebarRef}>
					<aside className={`${styles.container} ${styles.container_open}`}>
						<form className={styles.form}>
							<div className={styles.bottomContainer}>
								<Button
									title='Сбросить'
									htmlType='reset'
									type='clear'
									onClick={handleReset}
								/>
								<Button
									title='Применить'
									htmlType='submit'
									type='apply'
									onClick={handleApply}
								/>
							</div>
						</form>
					</aside>
				</div>
			)}
		</>
	);
};
